# Primo Search API

This is a basic implementation of the ExLibris Primo Search API.

## Usage

`npm install @kenxirwin/primo-search-api`

`import SearchApi from '@kenxirwin/primo-search-api';`

Initialize with your local settings:

```
const searchApi = new SearchApi({
  baseUrl,
  vid,
  scope,
  tab,
  apiKey,
});
```

Query Primo with the main query, plus any additional params, e.g.:

```
const searchQuery = 'any,contains,quixote';
let res = await searchApi.search(searchQuery);
// or
let res = await searchApi.search(searchQuery, { limit: 2, lang: 'es' });
```

## Methods

#### `search(query: SearchApiParams, options: SearchOptions): Promise<PrimoSearchResponse>`

Returns item data for a barcode.

**Returns:** `Promise<PrimoSearchResponse>`  
**Validated against:** `primoSearchResponseSchema`

Accepts params:

```
interface SearchApiParams {
  baseUrl: string;
  vid: string;
  scope: string;
  tab: string;
  apiKey: string;
  verbose?: boolean;
}

interface SearchOptions *** need to finish adding this***

See API documentation:
https://developers.exlibrisgroup.com/primo/apis/docs/primoSearch/R0VUIC9wcmltby92MS9zZWFyY2g=/
```
