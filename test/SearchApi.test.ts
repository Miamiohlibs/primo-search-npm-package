import dotenv from 'dotenv';
dotenv.config();
import { describe, it, expect } from 'vitest';
import { SearchApi } from '../dist/index.js';
import { primoSearchResponseSchema } from '../dist/schemas/PrimoResponseSchema.js';

const searchApi = new SearchApi({
  baseUrl: process.env.PRIMO_BASE_URL || '',
  apiKey: process.env.API_KEY || '',
  vid: process.env.VID_DEFAULT || '',
  scope: process.env.SCOPE_DEFAULT || '',
  tab: process.env.TAB_DEFAULT || '',
  verbose: true,
});

describe('SearchApi', () => {
  it('should find search results', async () => {
    const searchQuery = 'any,contains,quixote';
    const raw = await searchApi.search(searchQuery, { limit: 2, lang: 'es' });
    const results = primoSearchResponseSchema.parse(raw);
    expect(results).toEqual(raw);
  });
  it('should find search results with a different search', async () => {
    const searchQuery = 'any,contains,literature';
    const raw = await searchApi.search(searchQuery, { limit: 2, lang: 'es' });
    const results = primoSearchResponseSchema.parse(raw);
    expect(results).toEqual(raw);
  });
});
