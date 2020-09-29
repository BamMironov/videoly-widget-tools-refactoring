import type WidgetTools from '../Tools'

class NodeBuilderContext implements IContext {
  private strategy: IElementStrategy;

  tools: WidgetTools;
  isMounting: boolean;
  isLastElement: boolean;
  anchorElement: HTMLAnchorElement;

  buildFrame: () => HTMLElement;
  buildDOM: (tree: IElementSpecification[]) => HTMLElement;

  constructor({
    tools,
    isMounting,
    anchorElement,
    isLastElement,
    buildFrame,
    buildDOM,
  }) {
    this.tools = tools;
    this.anchorElement = anchorElement;
    this.isMounting = isMounting;
    this.isLastElement = isLastElement;
    this.buildFrame = buildFrame;
    this.buildDOM = buildDOM;
  }

  setStrategy(strategy: IElementStrategy) {
    this.strategy = strategy;
  }

  executeStrategy(): HTMLElement {
    return this.strategy.execute(this);
  }
}

export default NodeBuilderContext;
