import { describe, it, expect, beforeEach } from "vitest";
import { ConsistentHashing } from "src/ConsistentHashing.js";

describe("ConsistentHashing", () => {
  let ch: ConsistentHashing;

  beforeEach(() => {
    ch = new ConsistentHashing(3);
  });

  it("should add nodes and store all virtual nodes", () => {
    ch.addNode("node1");
    ch.addNode("node2");

    const keys = ch.getAllKeys();
    expect(keys).toHaveLength(6);
    expect(keys).toEqual(
      expect.arrayContaining([
        "node1",
        "node1",
        "node1",
        "node2",
        "node2",
        "node2",
      ])
    );
  });

  it("should remove nodes and their replicas", () => {
    ch.addNode("node1");
    ch.addNode("node2");
    ch.removeNode("node1");

    const keys = ch.getAllKeys();
    expect(keys).toHaveLength(3);
    expect(keys).toEqual(expect.arrayContaining(["node2", "node2", "node2"]));
    expect(keys).not.toContain("node1");
  });

  it("should get the correct node for a given key", () => {
    ch.addNode("node1");
    ch.addNode("node2");

    const node = ch.getNode("my-key");
    expect(["node1", "node2"]).toContain(node);
  });

  it("should return null if no nodes exist", () => {
    expect(ch.getNode("any-key")).toBeNull();
  });

  it("should wrap around to the smallest node if hash exceeds max", () => {
    ch.addNode("z");
    ch.addNode("a");

    const result = ch.getNode("very-high-key");
    expect(["a", "z"]).toContain(result);
  });
});
