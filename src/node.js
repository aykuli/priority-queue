class Node {
  constructor(data, priority) {
    this.data = data;
    this.priority = priority;
    this.parent = null;
    this.left = null;
    this.right = null;
  }

  appendChild(node) {
    if (this.left == null) {
      this.left = node;
    } else if (this.right == null) this.right = node;

    node.parent = this;
  }

  removeChild(node) {
    if (this.left.data == node.data) {
      this.left = null;
    } else if (this.right.data == node.data) {
      this.right = null;
    } else throw new Error("passed node is not a child of this node");

    node.parent = null;
  }

  remove() {
    if (this.parent) {
      this.parent.removeChild(this);
    }
  }

  swapWithParent() {
    if (this.parent !== null) {
      let buffParent = this.parent;
      let buffLeft = this.left;
      let buffRight = this.right;
      this.parent = buffParent.parent;

      if (buffParent.left == this) {
        this.left = buffParent;
        this.right = buffParent.right;
        if (this.right) this.right.parent = this;
      } else if (buffParent.right == this) {
        this.left = buffParent.left;
        this.right = buffParent;
        if (this.left) this.left.parent = this;
      }
      if (this.parent) {
        if (this.parent.left == buffParent) this.parent.left = this;
        else if (this.parent.right == buffParent) this.parent.right = this;
      }
      if (buffLeft) buffLeft.parent = buffParent;
      if (buffRight) {
        buffRight.parent = buffParent;
      }

      buffParent.parent = this;
      buffParent.left = buffLeft;
      buffParent.right = buffRight;
    }
  }
}

module.exports = Node;
