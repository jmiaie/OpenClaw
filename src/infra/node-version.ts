import process from "node:process";

export function resolveNodeMajor(nodeVersion: string = process.versions.node): number {
  const [majorRaw = "0"] = nodeVersion.split(".");
  const major = Number(majorRaw);
  return Number.isFinite(major) ? major : 0;
}

export function shouldInstallGaxiosFetchCompat(
  nodeVersion: string = process.versions.node,
): boolean {
  return resolveNodeMajor(nodeVersion) >= 25;
}
