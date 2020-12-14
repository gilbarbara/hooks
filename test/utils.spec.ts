import { isPlainObject, isString, isURL } from '../src/utils';

describe('utils', () => {
  describe('isPlainObject', () => {
    it('should match properly', () => {
      expect(isPlainObject({})).toBe(true);
      expect(isPlainObject([])).toBe(false);
      expect(isPlainObject('')).toBe(false);
    });
  });

  describe('isString', () => {
    it('should match properly', () => {
      expect(isString('')).toBe(true);
      expect(isString({})).toBe(false);
      expect(isString([])).toBe(false);
    });
  });

  describe('isURL', () => {
    it('should match properly', () => {
      expect(isURL('https://example.com')).toBe(true);
      expect(isURL('ftp://example.com')).toBe(true);
      expect(isURL('')).toBe(false);
      expect(isURL([])).toBe(false);
    });
  });
});
