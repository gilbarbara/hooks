import { RefObject } from 'react';

export type PlainObject<T = unknown> = Record<string | number | symbol, T>;

export type Target<T extends Element> = RefObject<T> | T | null | string;
