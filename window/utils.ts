interface EventSpot extends HTMLElement {
  attachEvent(event: string, listener: EventListener): boolean;
  detachEvent(event: string, listener: EventListener): void;
}

export const noop = () => {};

export function attachEvent(
  eventName: string,
  target: HTMLElement,
  callback: () => void
): void {
  let method = target['attachEvent'] ? 'attachEvent' : 'addEventListener'

  target[method](eventName, callback)
}


const COMPLETE = 'complete';
const INTERACTIVE = 'interactive';

export function isDocumentLoading(document: HTMLDocument): boolean {
  return ![COMPLETE, INTERACTIVE].includes(document?.readyState)
}
