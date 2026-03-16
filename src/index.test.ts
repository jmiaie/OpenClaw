import fs from "node:fs";
import { afterEach, describe, expect, it, vi } from "vitest";

const runtimeMocks = vi.hoisted(() => ({
  installGaxiosFetchCompat: vi.fn(),
  runCli: vi.fn(async () => {}),
  shouldInstallGaxiosFetchCompat: vi.fn(() => false),
}));

vi.mock("./cli/run-main.js", () => ({
  runCli: runtimeMocks.runCli,
}));

vi.mock("./infra/gaxios-fetch-compat.js", () => ({
  installGaxiosFetchCompat: runtimeMocks.installGaxiosFetchCompat,
}));

vi.mock("./infra/node-version.js", () => ({
  shouldInstallGaxiosFetchCompat: runtimeMocks.shouldInstallGaxiosFetchCompat,
}));

describe("legacy root entry", () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
  });

  it("routes the package root export to the pure library entry", () => {
    const packageJson = JSON.parse(
      fs.readFileSync(new URL("../package.json", import.meta.url), "utf8"),
    ) as {
      exports?: Record<string, unknown>;
      main?: string;
    };

    expect(packageJson.main).toBe("dist/index.js");
    expect(packageJson.exports?.["."]).toBe("./dist/index.js");
  });

  it("does not run CLI bootstrap when imported as a library dependency", async () => {
    const mod = await import("./index.js");

    expect(typeof mod.runLegacyCliEntry).toBe("function");
    expect(runtimeMocks.runCli).not.toHaveBeenCalled();
  });

  it("keeps library imports free of global window shims", async () => {
    const originalWindowDescriptor = Object.getOwnPropertyDescriptor(globalThis, "window");
    Reflect.deleteProperty(globalThis as object, "window");

    try {
      await import("./index.js");
      expect("window" in globalThis).toBe(false);
    } finally {
      if (originalWindowDescriptor) {
        Object.defineProperty(globalThis, "window", originalWindowDescriptor);
      }
    }
  });

  it("delegates legacy direct-entry execution to run-main", async () => {
    const mod = await import("./index.js");
    const argv = ["node", "dist/index.js", "status"];

    await mod.runLegacyCliEntry(argv);

    expect(runtimeMocks.runCli).toHaveBeenCalledOnce();
    expect(runtimeMocks.runCli).toHaveBeenCalledWith(argv);
  });

  it("skips gaxios fetch compat on Node versions that do not need it", async () => {
    runtimeMocks.shouldInstallGaxiosFetchCompat.mockReturnValueOnce(false);
    const mod = await import("./index.js");

    await mod.runLegacyCliEntry(["node", "dist/index.js", "status", "--json"]);

    expect(runtimeMocks.installGaxiosFetchCompat).not.toHaveBeenCalled();
  });

  it("installs gaxios fetch compat when the runtime requires it", async () => {
    runtimeMocks.shouldInstallGaxiosFetchCompat.mockReturnValueOnce(true);
    const mod = await import("./index.js");

    await mod.runLegacyCliEntry(["node", "dist/index.js", "status", "--json"]);

    expect(runtimeMocks.installGaxiosFetchCompat).toHaveBeenCalledOnce();
  });
});
