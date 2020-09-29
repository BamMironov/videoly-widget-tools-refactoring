class NodeInsertionBuilder {
  node: Node;

  constructor(node) {
    this.node = node;
  }

  get parentNode() {
    return this.node.parentElement;
  }

  insertAfter(element: HTMLElement) {
    this.parentNode.insertBefore(element, this.node.nextSibling);
  }

  appendChild(element: HTMLElement) {
    this.node.appendChild(element);
  }

  insertBefore(element: HTMLElement) {
    this.parentNode.insertBefore(element, this.node);
  }

  insertBeforeFirstChild(element: HTMLElement) {
    this.node.insertBefore(element, this.node.firstChild);
  }
}

export default NodeInsertionBuilder;
