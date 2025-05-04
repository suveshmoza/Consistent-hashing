import { BST } from "./data-structures/BST.js";
import { hash } from "./utils/hash.js";

/**
 * Consistent Hashing class for distributing keys to nodes
 * This class uses a Binary Search Tree(BST) for now to implement the ring
 * Each node is replicated replicas times to improve load distribution
 */
export class ConsistentHashing {
  private ring: BST<number, string>;
  private replicas: number;

  constructor(replicas = 3) {
    this.ring = new BST<number, string>();
    this.replicas = replicas;
  }

  /**
   * Add a node to the consistent hash ring
   * The node is replicated replicas times to improve load distribution
   * @param {string}nodeId The unique identifier of the node
   */
  addNode(nodeId: string): void {
    for (let i = 0; i < this.replicas; i++) {
      const virtualNodeKey = `${nodeId}#${i}`;
      const h = hash(virtualNodeKey);
      this.ring.insert(h, nodeId);
    }
  }

  /**
   * Remove a node from the consistent hashing ring.
   * The node's virtual nodes (replicas) are also removed.
   * @param {string} nodeId The unique identifier of the node to remove.
   */
  removeNode(nodeId: string): void {
    for (let i = 0; i < this.replicas; i++) {
      const virtualNodeKey = `${nodeId}#${i}`;
      const h = hash(virtualNodeKey);
      this.ring.delete(h);
    }
  }

  /**
   * Get the node responsible for a specific key.
   * The key is hashed and the corresponding node is found in the ring.
   * @param {string} key The key to hash and find the responsible node for.
   * @returns {string | null} The node id or null if no node is found.
   */
  getNode(key: string): string | null {
    const keyHash = hash(key);
    const node = this.ring.findGreaterOrEqual(keyHash);

    if (node) return node.value;

    const firstNode = this.ring.findMin();
    return firstNode ? firstNode.value : null;
  }

  /**
   * Get all nodes in the consistent hash ring.
   * @returns {string[]} An array of node ids.
   */
  getAllKeys(): string[] {
    const nodes: string[] = [];
    this.ring.inorderTraversal((node) => {
      console.log(node);
      nodes.push(node.value);
    });
    return nodes;
  }
}
