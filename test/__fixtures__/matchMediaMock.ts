function callback(returnType: any = undefined) {
  return () => returnType;
}

export default function matchMediaMock(query: string, matches = true) {
  return {
    addListener: callback(),
    addEventListener: callback(),
    dispatchEvent: callback(),
    listeners: {},
    matches,
    media: query,
    onchange: null,
    removeEventListener: callback(),
    removeListener: callback(),
  };
}
