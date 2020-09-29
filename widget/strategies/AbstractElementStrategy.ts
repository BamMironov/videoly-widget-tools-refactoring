abstract class ElementBuilderStrategy implements IElementStrategy {
  elemSpec: IElementSpecification;

  constructor(elemSpec: IElementSpecification) {
    this.elemSpec = elemSpec;
  }

  abstract execute(context: IContext): HTMLElement
}

export default ElementBuilderStrategy;
