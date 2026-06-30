# Primo Search API

This is a basic implementation of the ExLibris Primo Search API.

## Installation

`npm install @kenxirwin/primo-search-api`

`import SearchApi from '@kenxirwin/primo-search-api';`

## Initialization

Initialize with your local settings:

```
const searchApi = new SearchApi( SearchApiParams);
```

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
```

## Methods

### `search(query: string, options: SearchApiAddedParams): Promise<PrimoSearchResponse>`

Returns Primo search results.

**Returns:** `Promise<PrimoSearchResponse>`  
**Validated against:** `primoSearchResponseSchema`

Query Primo with the main query, plus any additional params, e.g.:

```
const searchQuery = 'any,contains,quixote';
let res = await searchApi.search(searchQuery);
// or
let res = await searchApi.search(searchQuery, { limit: 2, lang: 'es' });
```

Accepts params:

```


interface SearchApiAddedParams {
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
```

See The Primo API documentation for details on the SearchApiAddedParams:
https://developers.exlibrisgroup.com/primo/apis/docs/primoSearch/R0VUIC9wcmltby92MS9zZWFyY2g=/
