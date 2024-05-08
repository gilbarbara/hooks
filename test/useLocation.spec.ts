import { renderHook } from '@testing-library/react';

import { useLocation } from '../src/useLocation';

describe('useLocation', () => {
  it('should return properly with all properties', () => {
    Object.defineProperty(window, 'location', {
      value: new URL('https://example.com/test?user=123&auth=kj3hy095#state'),
    });

    const { result } = renderHook(() => useLocation());

    expect(result.current).toEqual({
      hash: '#state',
      host: 'example.com',
      hostname: 'example.com',
      href: 'https://example.com/test?user=123&auth=kj3hy095#state',
      origin: 'https://example.com',
      pathname: '/test',
      port: '',
      protocol: 'https:',
      query: { user: '123', auth: 'kj3hy095' },
      search: '?user=123&auth=kj3hy095',
    });
  });

  it('should return properly with a simple url', () => {
    Object.defineProperty(window, 'location', {
      value: new URL('https://example.com:8080'),
    });

    const { result } = renderHook(() => useLocation());

    expect(result.current).toEqual({
      hash: '',
      host: 'example.com:8080',
      hostname: 'example.com',
      href: 'https://example.com:8080/',
      origin: 'https://example.com:8080',
      pathname: '/',
      port: '8080',
      protocol: 'https:',
      query: {},
      search: '',
    });
  });
});
