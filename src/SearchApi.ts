// var https = require('https');
import https from 'node:https';
import {
  PrimoSearchResponse,
  primoSearchResponseSchema,
} from './schemas/PrimoResponseSchema.js';

// import type { PrimoSearchResponse } from './schemas/PrimoResponseSchema';

export interface SearchApiParams {
  baseUrl: string;
  vid: string;
  scope: string;
  tab: string;
  apiKey: string;
  verbose?: boolean;
}

export interface SearchApiAddedParams {
  qInclude?: string;
  qExclude?: string;
  multiFacets?: string;
  journals?: string;
  newspapersSearch?: boolean;
  newspapersActive?: boolean;
  pcAvailability?: boolean;
  databases?: string;
  lang?: string;
  fromDate?: string;
  offset?: number;
  limit?: number;
  sort?: string;
  personalization?: string;
  getMore?: string;
  conVoc?: boolean;
  inst?: string;
  skipDelivery?: boolean;
  disableSplitFacets?: boolean;
}

export default class SearchApi {
  private readonly baseUrl: string;
  private readonly vid: string;
  private readonly scope: string;
  private readonly tab: string;
  private readonly apiKey: string;
  public readonly verbose: boolean;

  constructor(params: SearchApiParams) {
    const { baseUrl, vid, scope, tab, apiKey, verbose = false } = params;

    for (const [name, value] of Object.entries({
      baseUrl,
      vid,
      scope,
      tab,
      apiKey,
    })) {
      if (value.trim() === '') {
        throw new Error(`${name} cannot be empty`);
      }
    }

    this.baseUrl = baseUrl.trim();
    this.vid = vid.trim();
    this.scope = scope.trim();
    this.tab = tab.trim();
    this.apiKey = apiKey.trim();
    this.verbose = verbose;
  }

  async search(query: string, params: SearchApiAddedParams = {}) {
    if (typeof query !== 'string' || query.trim() === '') {
      throw new Error('Query must be a non-empty string');
    }
    const response = await this.performSearch(query, { ...params });
    this.verbose && console.log(`performSearch returns: ${typeof response}`);
    return response;
  }

  async performSearch(
    query: string,
    addedParams: SearchApiAddedParams = {},
  ): Promise<PrimoSearchResponse> {
    const apiPath = '/primo/v1/search';
    const urlString = this.baseUrl + apiPath;
    this.verbose && console.log(`URL: ${urlString}`);
    this.verbose && console.log(`Searching for "${query}" with params:`);
    const url = new URL(urlString);
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

    this.verbose && console.log(`Constructed URL: ${url.toString()}`);
    try {
      const raw = await this.request({
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
      this.verbose && console.log(`performSearch raw: ${typeof raw}`);

      const json = JSON.parse(raw);
      this.verbose && console.log(`performSearch json: ${typeof json}`);

      const response = primoSearchResponseSchema.parse(json);
      this.verbose && console.log(`performSearch returns: ${typeof response}`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async request(options: any): Promise<string> {
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
