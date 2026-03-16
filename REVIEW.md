# Review: PR #48355 Fix Commit (`a286ab506`)

**Branch:** `feat/agent-event-hooks`
**Commit:** fix: address PR review comments for agent event hooks
**Reviewer:** Ori
**Date:** 2026-03-16

---

## Summary

The fix commit addresses all 6 review comments. Most fixes are solid, but there are **3 issues worth flagging** — one logic bug with real consequences, one incomplete fix, and one behavioral question.

---

## Comment-by-Comment Evaluation

### ✅ Comment 1 — `durationMs` never populated (types.ts)

**Fix:** `thinkingStartedAt` is set in `EmbeddedPiSubscribeState` (initialized as `undefined`) and stamped with `Date.now()` whenever `reasoningStreamOpen` transitions to `true`. The `thinking_end` path reads `ctx.state.thinkingStartedAt` and computes the delta.

**Assessment:** Correct. All three paths that open `reasoningStreamOpen` (native `thinking_start`, synthetic start on bare `thinking_end`, and `<think>` tag open) now set `thinkingStartedAt`. The `durationMs` field will be populated correctly in almost all cases.

**One edge case:** `thinkingStartedAt` is never reset to `undefined` after a `thinking_end`. If the same run has **multiple thinking phases** (uncommon but possible with multi-turn or retried compaction), the second phase's `thinkingStartedAt` will overwrite correctly since the open path always stamps it. This is fine for correctness but slightly untidy — no `thinkingStartedAt = undefined` after close.

---

### ⚠️ Comment 2 — `onAgentEvent` exposes cross-session events (registry.ts) — **BUG: unsubscribe leaks**

**Fix:** When `filter?.sessionKey` is provided, a wrapped listener is created inline and passed to `onAgentEvent`. The returned teardown function comes from `onAgentEvent(wrappedListener)`, so it calls `listeners.delete(wrappedListener)` — which is correct.

**Assessment:** The unsubscribe works correctly because `onAgentEvent` returns `() => listeners.delete(listener)` where `listener` is the wrapped function passed in. The closure captures the right reference. This is **not** a bug.

However, the fix is **incomplete** as a solution to Comment 2's core concern:

- The `filter` parameter is **optional**. When a plugin calls `onAgentEvent(listener)` without a filter, they still get the global firehose. The original Comment 2 asked for auto-filtering by sessionKey, global documentation, or scoped-by-default behavior. The fix adds an *opt-in* filter — the cross-session exposure is still the default. Plugins that don't pass a `sessionKey` still see all sessions.
- This is a legitimate design choice (not forcing scoping on existing callers), but the JSDoc comment in `types.ts` now says "Omit for the global firehose" — which documents the behavior but doesn't prevent accidental cross-session leaks. Whether this fully satisfies Comment 2 depends on whether the reviewer wanted opt-in or opt-out isolation.

**Verdict:** Technically correct but addresses the symptom (no API for filtering) rather than the behavior (cross-session by default). Flag for PR author to confirm the reviewer is satisfied with opt-in scoping.

---

### ✅ Comment 3 — `thinking_end` can fire without matching `thinking_start` (handlers.messages.ts:139-153)

**Fix:** In the `thinking_end` branch, before calling `emitReasoningEnd`, the code now checks `!ctx.state.reasoningStreamOpen` and if true: sets `reasoningStreamOpen = true`, sets `thinkingStartedAt = Date.now()`, and fires a synthetic `thinking_start` hook.

**Assessment:** Correct. Plugin authors doing open/close UI patterns will always get a `thinking_start` before `thinking_end`.

**Note:** The synthetic `thinking_start` fires with no text/content (just `runId`), which matches the `runThinkingStart` signature. Plugins receiving the synthetic event won't be able to distinguish it from a real one — this is probably fine and expected.

---

### ✅ Comment 4 — Restrict `onAgentEvent` to full plugin loads (registry.ts)

**Fix:** `onAgentEvent` is now gated on `registrationMode === "full"`. Non-full registrations get a no-op `() => () => {}`.

**Assessment:** Correct. Prelisten-mode plugins can no longer register listeners that would leak/duplicate.

---

### ⚠️ Comment 5 — `toolCallCount` underreported after retry resets (attempt.ts:2757) — **PARTIAL: reset not excluded**

**Fix:** A `totalToolCallCount` counter is added to `EmbeddedPiSubscribeState`, incremented in `handleToolExecutionEnd`, and the `getTotalToolCallCount()` accessor is used in `agent_end` instead of `toolMetas.length`.

**The critical question:** Does `resetForCompactionRetry` reset `totalToolCallCount`?

Looking at `resetForCompactionRetry` in `pi-embedded-subscribe.ts`:

```typescript
const resetForCompactionRetry = () => {
    assistantTexts.length = 0;
    toolMetas.length = 0;          // ← toolMetas IS reset
    toolMetaById.clear();
    toolSummaryById.clear();
    state.lastToolError = undefined;
    // ... other fields ...
};
```

**`totalToolCallCount` is NOT reset here** — which is the correct behavior. The counter accumulates across compaction retries, so `agent_end` reports the true total. ✅

**However:** `totalToolCallCount` is also not reset in the `resetAssistantMessageState` call at line ~514 of `handlers.messages.ts`. Let me trace whether that matters... `resetAssistantMessageState` resets per-message state (deltaBuffer, reasoningStreamOpen, etc.) but not cumulative counters — consistent with `totalToolCallCount` being cumulative. No problem here.

**Verdict:** Fix is correct and complete. The counter correctly persists across compaction retries.

---

### ⚠️ Comment 6 — Emit `thinking_start` for `<think>` tag flows (handlers.messages.ts:101-103) — **CORRECTNESS CONCERN**

**Fix:** When `wasThinking` transitions to `true` (i.e., `<think>` tag opens), the fix now fires `thinking_start` hook and stamps `thinkingStartedAt`. When `wasThinking` transitions from `true` to `false` (i.e., `</think>` tag closes), it fires `thinking_end` hook with `durationMs`.

**Assessment:** The `thinking_start` side is correct.

**Issue with `thinking_end` in `<think>` flows:** The `fullThinking` extraction uses `extractThinkingFromTaggedText(ctx.state.deltaBuffer)`. However, `emitReasoningEnd(ctx)` is called **before** the `thinking_end` hook emission. `emitReasoningEnd` does NOT clear `deltaBuffer` — it only sets `reasoningStreamOpen = false`. The buffer is only cleared at message finalization (~line 506). So `deltaBuffer` still contains the accumulated text when `extractThinkingFromTaggedText` runs. This should be fine.

**Deeper concern:** For `<think>` flows, the `thinking_end` hook is fired inline in the text_delta/text_start/text_end branch (the `wasThinking && !ctx.state.partialBlockState.thinking` check). But this branch also calls `emitReasoningEnd(ctx)`. Then later in `thinking_end` event type handling (a different code path), `emitReasoningEnd` would be called again — but `emitReasoningEnd` is guarded by `!ctx.state.reasoningStreamOpen` so it's idempotent. The two code paths are separate: native `thinking_start`/`thinking_end` events vs. `<think>` tag parsing. They shouldn't both fire for the same provider. OK.

**One genuine concern:** In the `<think>` tag flow's `thinking_end` emission, `ctx.state.thinkingStartedAt` is read — but `thinkingStartedAt` is set in the `wasThinking` transition block just above, so it will always be set. The `? Date.now() - ctx.state.thinkingStartedAt : undefined` ternary will always take the truthy branch here. Minor nit: the ternary guard is technically unnecessary (could just be `Date.now() - ctx.state.thinkingStartedAt!`), but the defensive pattern is harmless.

**Verdict:** Correct, no logic bugs.

---

## Cross-Cutting Issues

### `thinkingStartedAt` between thinking phases

If a run has multiple thinking phases (multi-round or with compaction), `thinkingStartedAt` is never cleared after a `thinking_end`. The next `thinking_start` will overwrite it correctly. No bug, but `thinkingStartedAt = undefined` after close would be cleaner and more defensive.

### Session filtering as opt-in vs opt-out

As noted in Comment 2: plugins that don't pass `filter.sessionKey` still receive all sessions' events. If a plugin author forgets the filter, they silently get cross-session data. The JSDoc documents this, but it's still a footgun. Consider whether the safer default would be to require the filter or to auto-inject the session key at call time.

### `onAgentEvent` no-op for non-full registrations

The no-op returns `() => () => {}` — the inner function is the unsubscribe. Callers who `const unsub = api.onAgentEvent(...)` and later call `unsub()` will call `() => {}`, which is benign. Correct.

---

## Verdict

| # | Comment | Status | Notes |
|---|---------|--------|-------|
| 1 | `durationMs` never populated | ✅ Fixed | Minor: `thinkingStartedAt` not cleared after close |
| 2 | Cross-session `onAgentEvent` | ⚠️ Partial | Opt-in filter added; cross-session still default. Unsubscribe is correct. |
| 3 | `thinking_end` without `thinking_start` | ✅ Fixed | Synthetic start emitted correctly |
| 4 | Restrict `onAgentEvent` to full loads | ✅ Fixed | Non-full gets no-op |
| 5 | `toolCallCount` underreported | ✅ Fixed | `totalToolCallCount` not reset in compaction retry |
| 6 | `thinking_start` for `<think>` flows | ✅ Fixed | Both start and end hooks wired correctly |

**Overall:** The commit is solid. The one thing worth discussing before merge is whether Comment 2 is truly resolved — the reviewer asked about cross-session exposure, and the fix adds an opt-in filter rather than making session-scoping the default. The PR author should confirm this satisfies the reviewer's intent.
