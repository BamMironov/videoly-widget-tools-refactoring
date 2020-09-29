import {
  NodeInsertionBuilder,
  NodeInsertionDirector,
} from '../builders';

import type NodeBuilderContext from './NodeBuilderContext'

import AbstractElementStrategy from './AbstractElementStrategy';

class TagElementStrategy extends AbstractElementStrategy {
  execute(context: NodeBuilderContext) {
    let { anchorElement, tools } = context;

    let manager = new NodeInsertionBuilder(anchorElement);
    let parentFrame = anchorElement.ownerDocument.defaultView;

    let element = tools.createElement(
      parentFrame,
      this.elemSpec.tag,
      this.elemSpec.attrs
    );

    if (this.elemSpec.text) {
      tools.setTextContent(element, this.elemSpec.text);
    }

    let director = new NodeInsertionDirector(manager, {
      isMounting: context.isMounting,
      isLastElement: context.isLastElement,
      isTopElement: tools.isVoid(anchorElement),
    });

    director.insertNode(element);

    return element;
  }
}

export default TagElementStrategy;
