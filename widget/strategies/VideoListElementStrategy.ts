import type NodeBuilderContext from './NodeBuilderContext'

import AbstractElementStrategy from './AbstractElementStrategy';

class VideoListElementStrategy extends AbstractElementStrategy {
  execute(context: NodeBuilderContext) {
    return context.buildFrame();
  }
}

export default VideoListElementStrategy;
