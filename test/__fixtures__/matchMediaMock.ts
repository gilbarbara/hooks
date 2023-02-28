export default function matchMediaMock(query: string, matches = true) {
  return {
    addListener: jest.fn(),
    addEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
    listeners: {},
    matches,
    media: query,
    onchange: null,
    removeEventListener: jest.fn(),
    removeListener: jest.fn(),
  };
}
