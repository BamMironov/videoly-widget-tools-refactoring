import type NodeInsertionBuilder from './NodeInsertionBuilder'

class NodeInsertionDirector {
  manager: NodeInsertionBuilder;
  isTopElement: boolean;
  isMounting: boolean;
  isLastElement: boolean;

  constructor(manager: NodeInsertionBuilder, options: INodeInsertionDirectorOptions) {
    this.manager = manager;
    this.isTopElement = options.isTopElement;
    this.isMounting = options.isMounting;
    this.isLastElement = options.isLastElement;
  }

  insertNode(element: HTMLElement): void {
    if (this.isMounting) {
      if (this.isTopElement) {
        if (this.isLastElement) {
          this.manager.insertAfter(element);
        } else {
          this.manager.insertBefore(element);
        }
      } else if (this.isLastElement) {
        this.manager.appendChild(element);
      } else {
        this.manager.insertBeforeFirstChild(element);
      }
    } else {
      this.manager.appendChild(element);
    }
  }
}

export default NodeInsertionDirector;
