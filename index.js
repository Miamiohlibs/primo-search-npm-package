// var https = require('https');
import https from 'https';

export default class SearchApi {
  constructor(params) {
    const expectedKeys = ['baseUrl', 'vid', 'scope', 'tab', 'apiKey'];
    for (const key of expectedKeys) {
      if (!params.hasOwnProperty(key)) {
        throw new Error(`Missing required option: ${key}`);
      } else if (typeof params[key] !== 'string') {
        throw new Error(
          `Option ${key} must be a string; received ${typeof params[key]}`
        );
      } else if (params[key].trim() === '') {
        throw new Error(`Option ${key} cannot be an empty string`);
      } else {
        this[key] = params[key].trim();
      }
    }
  }

  async search(query, params = {}) {
    if (typeof query !== 'string' || query.trim() === '') {
      throw new Error('Query must be a non-empty string');
    }
    return await this.performSearch(query, { ...params });
  }

  async performSearch(query, addedParams = {}) {
    const apiPath = '/primo/v1/search';

    // console.log(`Searching for "${query}" with params:`);
    const url = new URL(this.baseUrl + apiPath);
    url.searchParams.set('vid', this.vid);
    url.searchParams.set('scope', this.scope);
    url.searchParams.set('tab', this.tab);
    url.searchParams.set('q', query);
    url.searchParams.set('apikey', this.apiKey);
    for (const [key, value] of Object.entries(addedParams)) {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, value);
      }
    }
    // console.log(`Constructed URL: ${url.toString()}`);
    return await this.request({
      hostname: url.hostname,
      protocol: 'https:',
      path: apiPath + '?' + url.searchParams.toString(),
      port: 443,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
  }

  async request(options) {
    return new Promise((resolve, reject) => {
      https
        .get(options, (res) => {
          let data = '';

          // A chunk of data has been received.
          res.on('data', (chunk) => {
            data += chunk;
          });

          // The whole response has been received.
          res.on('end', () => {
            resolve(data);
          });
        })
        .on('error', (err) => {
          reject(err);
        });
    });
  }
}
