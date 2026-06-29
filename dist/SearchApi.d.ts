export interface SearchApiParams {
    baseUrl: string;
    vid: string;
    scope: string;
    tab: string;
    apiKey: string;
}
export interface AnyStringParams {
    [key: string]: string;
}
export default class SearchApi {
    private readonly baseUrl;
    private readonly vid;
    private readonly scope;
    private readonly tab;
    private readonly apiKey;
    constructor(params: SearchApiParams);
    search(query: string, params?: {}): Promise<unknown>;
    performSearch(query: string, addedParams?: AnyStringParams): Promise<unknown>;
    request(options: any): Promise<unknown>;
}
//# sourceMappingURL=SearchApi.d.ts.map