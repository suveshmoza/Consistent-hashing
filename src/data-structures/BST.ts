class TreeNode<K, V> {
  key: K;
  value: V;
  left: TreeNode<K, V> | null = null;
  right: TreeNode<K, V> | null = null;

  constructor(key: K, value: V) {
    this.key = key;
    this.value = value;
  }
}

export class BST<K, V> {
  root: TreeNode<K, V> | null = null;

  insert(key: K, value: V): void {
    this.root = this._insert(this.root, key, value);
  }

  search(val: K): TreeNode<K, V> | null {
    return this._search(this.root, val);
  }

  delete(key: K): void {
    this.root = this._delete(this.root, key);
  }

  public inorderTraversal(callback?: (node: TreeNode<K, V>) => void): void {
    this._inorderTraversal(this.root, callback);
  }

  findGreaterOrEqual(key: K): TreeNode<K, V> | null {
    return this._findGreaterOrEqual(this.root, key);
  }

  findMin(): TreeNode<K, V> | null {
    if (!this.root) return null;
    return this._findSuccessor(this.root);
  }

  // Private helper methods for the BST logic
  private _findGreaterOrEqual(
    node: TreeNode<K, V> | null,
    key: K
  ): TreeNode<K, V> | null {
    let result: TreeNode<K, V> | null = null;
    while (node) {
      if (key === node.key) return node;
      if (key < node.key) {
        result = node;
        node = node.left;
      } else {
        node = node.right;
      }
    }
    return result;
  }

  private _insert(
    node: TreeNode<K, V> | null,
    key: K,
    value: V
  ): TreeNode<K, V> {
    if (node === null) {
      return new TreeNode(key, value);
    }

    if (node.key === key) {
      node.value = value;
      return node;
    }

    if (key < node.key) {
      node.left = this._insert(node.left, key, value);
    } else {
      node.right = this._insert(node.right, key, value);
    }

    return node;
  }

  private _search(node: TreeNode<K, V> | null, key: K): TreeNode<K, V> | null {
    if (node === null) {
      return null;
    }
    if (node.key === key) {
      return node;
    }
    if (key < node.key) {
      return this._search(node.left, key);
    }
    return this._search(node.right, key);
  }

  private _delete(node: TreeNode<K, V> | null, key: K): TreeNode<K, V> | null {
    if (node === null) return null;

    if (key < node.key) {
      node.left = this._delete(node.left, key);
    } else if (key > node.key) {
      node.right = this._delete(node.right, key);
    } else {
      if (node.left === null && node.right === null) {
        return null;
      }

      if (node.left === null) return node.right;
      if (node.right === null) return node.left;

      const successor = this._findSuccessor(node.right);
      node.key = successor.key;
      node.value = successor.value;
      node.right = this._delete(node.right, successor.key);
    }

    return node;
  }

  private _findSuccessor(node: TreeNode<K, V>): TreeNode<K, V> {
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }

  private _inorderTraversal(
    node: TreeNode<K, V> | null,
    callback?: (node: TreeNode<K, V>) => void
  ): void {
    if (node === null) {
      return;
    }
    this._inorderTraversal(node.left, callback);
    if (callback) {
      callback(node);
    }
    this._inorderTraversal(node.right, callback);
  }
}
