import { RefObject } from 'react';

export type PlainObject<T = unknown> = Record<string | number | symbol, T>;

export type Target<T> = RefObject<T> | T | null | string;
