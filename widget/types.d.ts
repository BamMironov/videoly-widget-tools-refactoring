interface HTMLAttributes {
  id: string;
  src: string;
}

interface IFrameDescriptor {
  anchor: object;
  attrs: HTMLAttributes;
  options: object;
}

interface ICreateFrameOptions {
  onLoadingSuccess: () => void;
  onLoadingFailure: () => void;
}

interface IElementSpecification {
  tag: string;
  attrs: HTMLAttributes;
  text?: string;
  videoListFrame?: HTMLVideoElement;
  _content?: IElementSpecification[];
}

interface IDOMBuilderParams {
  box: any;
  anchorElement: HTMLAnchorElement;
  isMounting: boolean;
  tree: IElementSpecification[];
  options: object;
  data: object;
  buildFrameCallback: (
    HTMLAnchorElement,
    data: object,
    options: object
  ) => HTMLElement;
}
