import { 
  NodeBuilderContext,
  TagElementStrategy,
  NestedElementStrategy,
  VideoListElementStrategy
} from './strategies'

import { attachEvent, isDocumentLoading } from "../window/utils";

import Scheduler from "../window/Scheduler";

export default class WidgetTools {
  // <[FAKE METHODS]> //
  setAttributes(element: HTMLElement, attrs: HTMLAttributes): void {}
  //
  insertFrame(
    frame: HTMLIFrameElement,
    anchor: object,
    options: object
  ): void {}
  //
  getFrameDocument(frame: HTMLIFrameElement): HTMLDocument {
    return <HTMLDocument>{};
  }
  //
  getFrameBodyOrHead(
    frame: HTMLIFrameElement,
    shouldDoSomething: boolean
  ): HTMLBodyElement | HTMLHeadElement {
    return <HTMLBodyElement | HTMLHeadElement>{};
  }
  //
  logRemotely(error: Error, code: string, options: object): void {}
  //
  setTextContent(elem: HTMLElement, text: string) {}
  //
  createElement(
    window: Window,
    tag: string,
    attrs: HTMLAttributes
  ): HTMLElement {
    return <HTMLElement>{};
  }
  //
  isVoid(anchor: HTMLAnchorElement): boolean {
    return true;
  }
  // </[FAKE METHODS]> //

  createFrame(
    descriptor: IFrameDescriptor,
    bodyStyle: string,
    options: ICreateFrameOptions
  ): HTMLIFrameElement {
    const self = this;
    const frame = window.document.createElement("iframe");

    this.prepareFrame(frame, descriptor);
    this.attachOnLoadEvent(frame, iFrameLoaded);

    let scheduler = new Scheduler({
      timeout: 10000,
      onTimeout: () => {
        this.logRemotely(
          new Error(`The frame didn't get ready state for the ${framePurpose}`),
          "tools.createFrame.iFrameLoaded",
          {}
        );

        options.onLoadingFailure();
      },
    });

    let framePurpose = this.getFramePurpose(descriptor.attrs.id);

    function iFrameLoaded() {
      let task = scheduler.schedule(() => {
        const frameDoc = self.getFrameDocument(frame);

        if (isDocumentLoading(frameDoc)) return;

        if (task.isRunning) {
          task.cancel();
        }

        frameDoc.open();
        frameDoc.close();

        self.attachFrameStyles(frame, bodyStyle);

        options.onLoadingSuccess();
      });
    }

    return frame;
  }

  getFramePurpose(id: string) {
    return id === "quchbox-player" ? "player" : "box";
  }

  attachOnLoadEvent(target: HTMLElement, callback: () => void) {
    attachEvent("onload", target, callback);
  }

  private prepareAttributes(attrs: HTMLAttributes) {
    if (!attrs.src) {
      attrs.src = "about:blank";
    }
  }

  private attachFrameStyles(frame: HTMLIFrameElement, styles: string) {
    const body = this.getFrameBodyOrHead(frame, false);

    body.setAttribute("style", styles);
  }

  private prepareFrame(frame: HTMLIFrameElement, descriptor: IFrameDescriptor) {
    this.prepareAttributes(descriptor.attrs);
    this.setAttributes(frame, descriptor.attrs);
    this.insertFrame(frame, descriptor.anchor, descriptor.options);
  }

  buildDOM(params: IDOMBuilderParams): HTMLElement[] {
    let {
      box,
      anchorElement,
      isMounting,
      tree,
      options,
      data,
      buildFrameCallback,
    } = params;

    let context = new NodeBuilderContext({
      isMounting,
      tools: this,
      anchorElement,
      isLastElement: !!box.anchorElementLast,
      buildFrame: () => buildFrameCallback(anchorElement, data, options),
      buildDOM: (tree: IElementSpecification[]) =>
        this.buildDOM({
          ...params,
          isMounting: false,
          tree,
        }),
    });

    let builtDomElements = tree.map((elemSpec) => {
      switch (true) {
        case !!elemSpec.tag:
          context.setStrategy(new TagElementStrategy(elemSpec));
          break;

        case !!elemSpec.videoListFrame:
          context.setStrategy(new VideoListElementStrategy(elemSpec));
          break;

        case !!elemSpec._content:
          context.setStrategy(new NestedElementStrategy(elemSpec));
          break;

        default:
          break;
      }

      let element = context.executeStrategy();

      return element;
    });

    return builtDomElements;
  }
}
