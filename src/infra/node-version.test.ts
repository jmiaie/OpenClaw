import { describe, expect, it } from "vitest";
import { resolveNodeMajor, shouldInstallGaxiosFetchCompat } from "./node-version.js";

describe("node version helpers", () => {
  it("parses the major version from a semver string", () => {
    expect(resolveNodeMajor("24.13.0")).toBe(24);
  });

  it("treats invalid versions as zero", () => {
    expect(resolveNodeMajor("not-a-version")).toBe(0);
  });

  it("gates gaxios fetch compat to Node 25 and newer", () => {
    expect(shouldInstallGaxiosFetchCompat("24.13.0")).toBe(false);
    expect(shouldInstallGaxiosFetchCompat("25.0.0")).toBe(true);
  });
});
