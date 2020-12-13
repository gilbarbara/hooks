export const canUseDOM =
  typeof window !== 'undefined' && !!window.document && !!window.document.createElement;

export function isString(value: unknown): value is string {
  return typeof value === 'string';
}
