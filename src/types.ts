import { RefObject } from 'react';

export type PlainObject<T = unknown> = Record<PropertyKey, T>;

export type Primitive = bigint | boolean | null | number | string | symbol | undefined;

export type Target<T extends Element> = RefObject<T> | T | null | string;

export type TimerStatus = 'pending' | 'completed' | 'cancelled';
