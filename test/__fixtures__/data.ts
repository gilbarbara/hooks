export const mockContentRect = {
  bottom: 120,
  height: 100,
  left: 200,
  right: 200,
  top: 20,
  width: 640,
  x: 20,
  y: 120,
};

export const mockGetComputedStyleResponse = {
  borderBottom: '2px',
  borderLeft: '2px',
  borderRight: '2px',
  borderTop: '2px',
  height: '100px',
  paddingBottom: '2px',
  paddingLeft: '2px',
  paddingRight: '2px',
  paddingTop: '2px',
  width: '200px',
};

export const mockGetBoundingClientRectResponse = {
  bottom: 120,
  height: 100,
  left: 200,
  right: 200,
  top: 20,
  width: 640,
  x: 20,
  y: 120,
  toJSON: vi.fn(),
};

export const mockResizeObserveResponse = {
  borderBoxSize: [
    {
      blockSize: 100,
      inlineSize: 640,
    },
  ],
  contentBoxSize: [
    {
      blockSize: 100,
      inlineSize: 640,
    },
  ],
  contentRect: mockContentRect,
};
