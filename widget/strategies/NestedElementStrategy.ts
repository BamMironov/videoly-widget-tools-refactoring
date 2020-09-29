import type NodeBuilderContext from './NodeBuilderContext'

import AbstractElementStrategy from './AbstractElementStrategy';

class NestedElementStrategy extends AbstractElementStrategy {
  execute(context: NodeBuilderContext) {
    return context.buildDOM(this.elemSpec._content);
  }
}

export default NestedElementStrategy;
