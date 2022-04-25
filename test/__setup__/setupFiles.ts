/* eslint-disable class-methods-use-this */
import nodeFetch from 'node-fetch';

declare let global: any;

global.fetch = nodeFetch;

global.IntersectionObserver = class IntersectionObserver {
  observe() {
    return null;
  }

  unobserve() {
    return null;
  }
};

export {};
