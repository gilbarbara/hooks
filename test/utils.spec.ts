import { canUseDOM, getElement, isPlainObject, isString, isURL, noop, off, on } from '../src/utils';

describe('utils', () => {
  describe('canUseDOM', () => {
    it('should return properly', () => {
      expect(canUseDOM()).toBe(true);
    });
  });

  describe('isPlainObject', () => {
    it('should match properly', () => {
      expect(isPlainObject({})).toBe(true);
      expect(isPlainObject([])).toBe(false);
      expect(isPlainObject('')).toBe(false);
    });
  });

  describe('getElement', () => {
    it('should return the element', () => {
      const target = document.createElement('div');

      target.setAttribute('data-testid', 'test');
      document.body.appendChild(target);

      console.log(getElement(target)?.getAttribute('data-testid'));

      expect(getElement('[data-testid="test"]')).toBe(target);

      document.body.removeChild(target);

      expect(getElement('[data-testid="test"]')).toBeNull();
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

  describe('noop', () => {
    it('should return undefined', () => {
      expect(noop()).toBe(undefined);
    });
  });

  describe('off', () => {
    it('should remove the event listener', () => {
      const target = document.createElement('div');
      const eventListener = vi.fn();

      on(target, 'click', eventListener);
      off(target, 'click', eventListener);

      target.dispatchEvent(new Event('click'));

      expect(eventListener).not.toHaveBeenCalled();
    });
  });

  describe('on', () => {
    it('should add an event listener', () => {
      const target = document.createElement('div');
      const eventListener = vi.fn();

      on(target, 'click', eventListener);

      target.dispatchEvent(new Event('click'));

      expect(eventListener).toHaveBeenCalled();
    });
  });
});
