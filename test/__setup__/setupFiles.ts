/* eslint-disable class-methods-use-this */
import nodeFetch from 'node-fetch';

declare let global: any;

global.fetch = nodeFetch;

export {};
