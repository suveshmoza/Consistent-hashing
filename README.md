# Consistent Hashing in TypeScript

This project provides a simple yet effective implementation of **Consistent Hashing** using a **Binary Search Tree (BST)** to simulate the hash ring. It supports adding and removing nodes (with replicas) and distributes keys efficiently across them.

## Features

- Consistent hashing with virtual nodes (replicas)
- Efficient key-to-node mapping
- Graceful handling of node joins/leaves
- Customizable number of replicas
- Minimal dependencies, pure TypeScript

# Usage

```
import { ConsistentHashing } from "./ConsistentHashing.js";

const ch = new ConsistentHashing(3); // 3 replicas per node

// Add nodes
ch.addNode("nodeA");
ch.addNode("nodeB");

// Get the node responsible for a key
const node = ch.getNode("file.txt");
console.log(`'file.txt' is handled by: ${node}`);

// See the hash ring
console.log("All keys in ring:", ch.getAllKeys());

// Remove a node
ch.removeNode("nodeA");
console.log("After removal:", ch.getAllKeys());

```

# Project Structure

```
.
├── src/
│   ├── ConsistentHashing.ts    # Core class
│   ├── data-structures/
│   │   └── BST.ts              # Binary Search Tree used for the ring
│   └── utils/
│       └── hash.ts             # Hash function
├── tests/
│   └── ConsistentHashing.test.ts  # Unit tests
└── README.md

```

# Resources

- [Introduction and Consistent Hashing - Stanford University](https://web.stanford.edu/class/cs168/l/l1.pdf)
- [Consistent hashing - Wikipedia](https://en.wikipedia.org/wiki/Consistent_hashing)

# TODO

- [ ] Add support for node weights (load-based distribution)

- [ ] Replace BST with a more efficient data structure like a Red-Black Tree or Skip List

- [ ] Add support for custom hash functions
