const Node = require("./node");

class MaxHeap {
  constructor() {
    this.root = null;
    this.parentNodes = [];
    this.heapSize = 0;
  }

  push(data, priority) {
    let h = new Node(data, priority);
    this.heapSize++;
    this.insertNode(h);
    this.shiftNodeUp(h);
  }

  pop() {
    if (!this.isEmpty()) {
      let detachedRoot = this.detachRoot();
      this.restoreRootFromLastInsertedNode(detachedRoot);
      this.shiftNodeDown(this.root);
      return detachedRoot.data;
    }
  }

  detachRoot() {
    let detachedRoot = this.root;

    if (this.parentNodes.indexOf(this.root) >= 0) {
      this.parentNodes.shift();
    }

    this.root = null;
    this.heapSize--;

    return detachedRoot;
  }

  restoreRootFromLastInsertedNode(detached) {
    if (!this.isEmpty()) {
      this.root = this.parentNodes.pop();
      if (this.root.parent !== null) {
        if (
          this.root.parent !== detached &&
          this.root.parent.right == this.root
        ) {
          this.parentNodes.unshift(this.root.parent);
        }

        this.root.remove();

        if (detached.left !== this.root && detached.left !== null) {
          this.root.appendChild(detached.left);
        }

        if (detached.right !== this.root && detached.right !== null) {
          this.root.appendChild(detached.right);
        }

        if (this.root.right === null) {
          this.parentNodes.unshift(this.root);
        }
      }
    }
  }

  size() {
    return this.heapSize;
  }

  isEmpty() {
    return this.root === null && this.parentNodes.length === 0;
  }

  clear() {
    this.root = null;
    this.parentNodes = [];
    this.heapSize = 0;
  }

  insertNode(node) {
    if (this.root == null) {
      this.root = node;
      this.parentNodes.push(node);
    } else {
      this.parentNodes[0].appendChild(node);
      this.parentNodes.push(node);
    }

    if (this.parentNodes[0].left && this.parentNodes[0].right) {
      this.parentNodes.shift();
    }
  }

  shiftNodeUp(node) {
    if (node.parent !== null && node.priority > node.parent.priority) {
      let nodeIndexInParentNodes = this.parentNodes.indexOf(node);
      let parentIndexInParentNodes = this.parentNodes.indexOf(node.parent);

      if (nodeIndexInParentNodes >= 0) {
        if (parentIndexInParentNodes >= 0) {
          this.parentNodes[parentIndexInParentNodes] = node;
        }
        this.parentNodes[nodeIndexInParentNodes] = node.parent;
      }

      node.swapWithParent();
      this.shiftNodeUp(node);
    }

    if (node.parent == null) {
      this.root = node;
    }
  }

  shiftNodeDown(node) {
    if (!this.isEmpty() && node.left !== null) {
      //choose child to swap
      let swapChild = null;
      if (node.left !== null && node.right !== null) {
        if (node.left.priority > node.right.priority) {
          swapChild = node.left;
        } else {
          swapChild = node.right;
        }
      } else swapChild = node.left;

      if (swapChild !== null && node.priority < swapChild.priority) {
        let nodeIndexInParentNodes = this.parentNodes.indexOf(node);
        let childIndexInParentNodes = this.parentNodes.indexOf(swapChild);
        if (node == this.root) {
          this.root = swapChild;
        }

        if (childIndexInParentNodes >= 0) {
          if (nodeIndexInParentNodes >= 0) {
            this.parentNodes[nodeIndexInParentNodes] = this.parentNodes[
              childIndexInParentNodes
            ];
          }
          this.parentNodes[childIndexInParentNodes] = node;
        }

        swapChild.swapWithParent();
        this.shiftNodeDown(node);
      }
    }
  }
}

module.exports = MaxHeap;
