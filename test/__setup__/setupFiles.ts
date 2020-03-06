/* eslint-disable class-methods-use-this */
declare let global: any;

global.skipEventLoop = () => new Promise(resolve => setImmediate(resolve));

global.IntersectionObserver = class IntersectionObserver {
  observe() {
    return null;
  }

  unobserve() {
    return null;
  }
};

export {};
