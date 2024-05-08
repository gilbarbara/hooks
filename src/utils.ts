import { PlainObject, Primitive, Target } from './types';

export function canUseDOM() {
  return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
}

export function getElement<T extends Element>(target: Target<T>) {
  if (!canUseDOM()) {
    return null;
  }

  let targetEl: Element | null;

  if (typeof target === 'string') {
    targetEl = document.querySelector(target);
  } else {
    targetEl = target && 'current' in target ? target.current : target;
  }

  return targetEl;
}

export function isPlainObject(value: unknown): value is PlainObject {
  if (Object.prototype.toString.call(value) !== '[object Object]') {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);

  return prototype === null || prototype === Object.getPrototypeOf({});
}

export function isPrimitive(value: any): value is Primitive {
  return value !== Object(value);
}

export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export function isURL(value: unknown): value is string {
  if (!isString(value)) {
    return false;
  }

  try {
    new URL(value); // eslint-disable-line no-new

    return true;
  } catch {
    return false;
  }
}

export function noop() {
  return undefined;
}

/* eslint-disable @typescript-eslint/ban-types */
export function on<T extends Window | Document | HTMLElement | EventTarget>(
  target: T | null,
  ...rest: Parameters<T['addEventListener']> | [string, Function | null, ...any]
): void {
  if (target && target.addEventListener) {
    target.addEventListener(...(rest as Parameters<HTMLElement['addEventListener']>));
  }
}

export function off<T extends Window | Document | HTMLElement | EventTarget>(
  target: T | null,
  ...rest: Parameters<T['removeEventListener']> | [string, Function | null, ...any]
): void {
  if (target && target.removeEventListener) {
    target.removeEventListener(...(rest as Parameters<HTMLElement['removeEventListener']>));
  }
}
/* eslint-enable @typescript-eslint/ban-types */
