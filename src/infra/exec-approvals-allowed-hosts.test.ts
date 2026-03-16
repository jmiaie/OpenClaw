import { describe, expect, it } from "vitest";
import {
  resolveAllowlistForHost,
  resolveExecApprovalsFromFile,
  type ExecApprovalsFile,
} from "./exec-approvals.js";

const BASE_FILE: ExecApprovalsFile = {
  version: 1,
  socket: { path: "/tmp/test.sock", token: "test-token" },
  defaults: {},
  agents: {},
};

describe("per-host allowlists (exec-approvals)", () => {
  describe("resolveAllowlistForHost", () => {
    it("returns flat allowlist when no allowlistByHost", () => {
      const file: ExecApprovalsFile = {
        ...BASE_FILE,
        agents: {
          "main-agent": {
            allowlist: [{ id: "a", pattern: "/usr/bin/curl" }],
          },
        },
      };
      const resolved = resolveExecApprovalsFromFile({
        file,
        agentId: "main-agent",
        path: "/tmp/test.json",
        socketPath: "/tmp/test.sock",
        token: "test-token",
      });
      expect(resolved.allowlistByHost).toBeNull();
      const list = resolveAllowlistForHost(resolved, "gateway");
      expect(list).toHaveLength(1);
      expect(list[0].pattern).toBe("/usr/bin/curl");
    });

    it("returns host-specific entries when map format is used", () => {
      const file: ExecApprovalsFile = {
        ...BASE_FILE,
        agents: {
          "main-agent": {
            allowlist: {
              gateway: [{ id: "g1", pattern: "/usr/bin/gh" }],
              sandbox: [{ id: "s1", pattern: "python3" }],
            },
          },
        },
      };
      const resolved = resolveExecApprovalsFromFile({
        file,
        agentId: "main-agent",
        path: "/tmp/test.json",
        socketPath: "/tmp/test.sock",
        token: "test-token",
      });
      expect(resolved.allowlistByHost).not.toBeNull();

      const gatewayList = resolveAllowlistForHost(resolved, "gateway");
      expect(gatewayList).toHaveLength(1);
      expect(gatewayList[0].pattern).toBe("/usr/bin/gh");

      const sandboxList = resolveAllowlistForHost(resolved, "sandbox");
      expect(sandboxList).toHaveLength(1);
      expect(sandboxList[0].pattern).toBe("python3");
    });

    it("falls back to 'default' key when host-specific entry is absent", () => {
      const file: ExecApprovalsFile = {
        ...BASE_FILE,
        agents: {
          "main-agent": {
            allowlist: {
              default: [{ id: "d1", pattern: "/usr/bin/curl" }],
              gateway: [{ id: "g1", pattern: "/usr/bin/gh" }],
            },
          },
        },
      };
      const resolved = resolveExecApprovalsFromFile({
        file,
        agentId: "main-agent",
        path: "/tmp/test.json",
        socketPath: "/tmp/test.sock",
        token: "test-token",
      });

      // "node" not present → falls back to "default"
      const nodeList = resolveAllowlistForHost(resolved, "node");
      expect(nodeList).toHaveLength(1);
      expect(nodeList[0].pattern).toBe("/usr/bin/curl");

      // "gateway" has explicit entry
      const gatewayList = resolveAllowlistForHost(resolved, "gateway");
      expect(gatewayList).toHaveLength(1);
      expect(gatewayList[0].pattern).toBe("/usr/bin/gh");
    });

    it("returns empty array when no entries match and no default", () => {
      const file: ExecApprovalsFile = {
        ...BASE_FILE,
        agents: {
          "main-agent": {
            allowlist: {
              gateway: [{ id: "g1", pattern: "/usr/bin/gh" }],
            },
          },
        },
      };
      const resolved = resolveExecApprovalsFromFile({
        file,
        agentId: "main-agent",
        path: "/tmp/test.json",
        socketPath: "/tmp/test.sock",
        token: "test-token",
      });

      const sandboxList = resolveAllowlistForHost(resolved, "sandbox");
      expect(sandboxList).toHaveLength(0);
    });
  });

  describe("backward compatibility: legacy array → treated as flat list", () => {
    it("resolves as flat allowlist when value is an array", () => {
      const file: ExecApprovalsFile = {
        ...BASE_FILE,
        agents: {
          "main-agent": {
            allowlist: [
              { id: "a1", pattern: "/usr/bin/curl" },
              { id: "a2", pattern: "/usr/bin/gh" },
            ],
          },
        },
      };
      const resolved = resolveExecApprovalsFromFile({
        file,
        agentId: "main-agent",
        path: "/tmp/test.json",
        socketPath: "/tmp/test.sock",
        token: "test-token",
      });
      expect(resolved.allowlistByHost).toBeNull();
      expect(resolved.allowlist).toHaveLength(2);
      // resolveAllowlistForHost returns flat list for any host
      expect(resolveAllowlistForHost(resolved, "gateway")).toHaveLength(2);
      expect(resolveAllowlistForHost(resolved, "sandbox")).toHaveLength(2);
    });
  });

  describe("wildcard agent entries", () => {
    it("merges wildcard flat entries into per-host resolution", () => {
      const file: ExecApprovalsFile = {
        ...BASE_FILE,
        agents: {
          "*": {
            allowlist: [{ id: "w1", pattern: "/usr/bin/env" }],
          },
          "main-agent": {
            allowlist: {
              gateway: [{ id: "g1", pattern: "/usr/bin/gh" }],
            },
          },
        },
      };
      const resolved = resolveExecApprovalsFromFile({
        file,
        agentId: "main-agent",
        path: "/tmp/test.json",
        socketPath: "/tmp/test.sock",
        token: "test-token",
      });
      // allowlistByHost is set because agent uses map format
      expect(resolved.allowlistByHost).not.toBeNull();
      // gateway bucket: wildcard flat entries merged in
      const gatewayList = resolveAllowlistForHost(resolved, "gateway");
      expect(gatewayList.map((e) => e.pattern)).toContain("/usr/bin/env");
      expect(gatewayList.map((e) => e.pattern)).toContain("/usr/bin/gh");
    });
  });
});
