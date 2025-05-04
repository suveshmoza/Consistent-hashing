import { createHash } from "crypto";

export function hash(key: string): number {
  const normalizedKey = key.toLowerCase().trim();
  const hash = createHash("sha256").update(normalizedKey).digest("hex");
  return parseInt(hash.substring(0, 8), 16) >>> 0;
}
