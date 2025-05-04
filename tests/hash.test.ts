import { hash } from "../src/utils/hash";
import { describe, it, expect } from "vitest";

describe("Hash Function", () => {
  it("should return a number for any string input", () => {
    const result = hash("someKey");
    expect(typeof result).toBe("number");
  });

  it("should return the same hash for the same input", () => {
    const h1 = hash("someKey");
    const h2 = hash("someKey");

    expect(h1).toBe(h2);
  });

  it("should return the different hash for the different input", () => {
    const h1 = hash("someKey1");
    const h2 = hash("someKey2");

    expect(h1).not.toBe(h2);
  });

  it("should return the same hash for the same input with different cases", () => {
    const h1 = hash("someKey");
    const h2 = hash("SomeKey");
    const h3 = hash("SOMEKEY");
    const h4 = hash("SOMEkey");

    expect(h1).toBe(h2);
    expect(h1).toBe(h3);
    expect(h1).toBe(h4);
  });

  it("should return the same hash for the same input with different spaces", () => {
    const h1 = hash("someKey");
    const h2 = hash("  someKey  ");
    const h3 = hash("someKey   ");
    const h4 = hash(" someKey");

    expect(h1).toBe(h2);
    expect(h1).toBe(h3);
    expect(h1).toBe(h4);
  });
});
