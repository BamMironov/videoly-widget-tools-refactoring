interface IContext {
  setStrategy(strategy: IElementStrategy): void

  executeStrategy(): HTMLElement;
}

interface IElementStrategy {
  execute(context: IContext): HTMLElement;
}

