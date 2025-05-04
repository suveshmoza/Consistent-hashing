import { describe, it, expect } from "vitest";
import { BST } from "src/data-structures/BST";

describe("Binary Search Tree", () => {
  it("should insert values correctly", () => {
    const bst = new BST<number, number>();
    bst.insert(10, 10);
    bst.insert(5, 5);
    bst.insert(15, 15);
    bst.insert(3, 3);
    bst.insert(7, 7);
    bst.insert(12, 12);
    bst.insert(18, 18);

    // Check root and its children
    expect(bst.root?.value).toBe(10);
    expect(bst.root?.left?.value).toBe(5);
    expect(bst.root?.right?.value).toBe(15);

    // Check deeper levels
    expect(bst.root?.left?.left?.value).toBe(3);
    expect(bst.root?.left?.right?.value).toBe(7);
    expect(bst.root?.right?.left?.value).toBe(12);
    expect(bst.root?.right?.right?.value).toBe(18);
  });

  it("should search for values correctly", () => {
    const bst = new BST<number, number>();
    bst.insert(10, 10);
    bst.insert(5, 5);
    bst.insert(15, 15);

    // Test existing values
    expect(bst.search(10)?.value).toBe(10);
    expect(bst.search(5)?.value).toBe(5);
    expect(bst.search(15)?.value).toBe(15);

    // Test non-existing values
    expect(bst.search(20)).toBeNull();
    expect(bst.search(0)).toBeNull();
  });

  it("should delete values correctly", () => {
    const bst = new BST<number, number>();
    bst.insert(10, 10);
    bst.insert(5, 5);
    bst.insert(15, 15);
    bst.insert(3, 3);
    bst.insert(7, 7);

    // Delete a node with no children
    bst.delete(3);
    expect(bst.search(3)).toBeNull();

    // Delete a node with one child
    bst.delete(7);
    expect(bst.search(7)).toBeNull();

    // Delete a node with two children
    bst.delete(5);
    expect(bst.search(5)).toBeNull();

    // Ensure the tree structure is still valid
    expect(bst.root?.value).toBe(10);
    expect(bst.root?.left).toBeNull();
    expect(bst.root?.right?.value).toBe(15);
  });

  it("should handle edge cases", () => {
    const bst = new BST<number, number>();

    // Search in an empty tree
    expect(bst.search(10)).toBeNull();

    // Delete from an empty tree
    expect(() => bst.delete(10)).not.toThrow();

    // Insert duplicate keys
    bst.insert(10, 10);
    bst.insert(10, 20);

    expect(bst.root?.value).toBe(20);

    // Delete the root node
    bst.delete(10);
    expect(bst.root).toBeNull();
  });
});
