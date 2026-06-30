import { PrimoSearchResponse } from './schemas/PrimoResponseSchema.js';
export interface SearchApiParams {
    baseUrl: string;
    vid: string;
    scope: string;
    tab: string;
    apiKey: string;
    verbose?: boolean;
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
    readonly verbose: boolean;
    constructor(params: SearchApiParams);
    search(query: string, params?: {}): Promise<{
        info: {
            totalResultsLocal: number;
            totalResultsPC: number;
            total: number;
            first: number;
            last: number;
        };
        highlights: {
            termsUnion: string[];
        };
        docs: {
            context: string;
            adaptor: string;
            '@id': string;
            pnx: {
                search?: Record<string, string[]> | undefined;
                display?: Record<string, string[]> | undefined;
                delivery?: Record<string, string[]> | undefined;
                links?: Record<string, string[]> | undefined;
                addata?: Record<string, string[]> | undefined;
                facets?: Record<string, string[]> | undefined;
                sort?: Record<string, string[]> | undefined;
                control?: Record<string, unknown> | undefined;
            };
            delivery?: {
                fulltext?: string[] | undefined;
                delcategory?: string[] | undefined;
                bestlocation?: {
                    isValidUser: boolean;
                    organization: string;
                    libraryCode: string;
                    availabilityStatus: string;
                    subLocation: string;
                    subLocationCode: string;
                    mainLocation: string;
                    callNumber: string;
                    callNumberType: string;
                    holdingURL: string;
                    adaptorid: string;
                    ilsApiId: string;
                    holdId: string;
                    holKey: string;
                    matchForHoldings: {
                        matchOn: string;
                        holdingRecord: string;
                    }[];
                    stackMapUrl: string;
                    relatedTitle: string | null;
                    translateRelatedTitle: string | null;
                    yearFilter: string | null;
                    volumeFilter: string | null;
                    singleUnavailableItemProcessType: string | null;
                    boundWith: boolean;
                    '@id': string;
                } | null | undefined;
                holding?: {
                    isValidUser: boolean;
                    organization: string;
                    libraryCode: string;
                    availabilityStatus: string;
                    subLocation: string;
                    subLocationCode: string;
                    mainLocation: string;
                    callNumber: string;
                    callNumberType: string;
                    holdingURL: string;
                    adaptorid: string;
                    ilsApiId: string;
                    holdId: string;
                    holKey: string;
                    matchForHoldings: {
                        matchOn: string;
                        holdingRecord: string;
                    }[];
                    stackMapUrl: string;
                    relatedTitle: string | null;
                    translateRelatedTitle: string | null;
                    yearFilter: string | null;
                    volumeFilter: string | null;
                    singleUnavailableItemProcessType: string | null;
                    boundWith: boolean;
                    '@id': string;
                }[] | null | undefined;
                electronicServices?: unknown;
                additionalElectronicServices?: unknown;
                filteredByGroupServices?: unknown;
                quickAccessService?: unknown;
                deliveryCategory?: string[] | undefined;
                serviceMode?: string[] | undefined;
                availability?: string[] | undefined;
                availabilityLinks?: string[] | null | undefined;
                availabilityLinksUrl?: string[] | null | undefined;
                displayedAvailability?: unknown;
                displayLocation?: boolean | null | undefined;
                additionalLocations?: boolean | null | undefined;
                physicalItemTextCodes?: unknown;
                feDisplayOtherLocations?: boolean | null | undefined;
                almaInstitutionsList?: unknown[] | undefined;
                recordInstitutionCode?: string | null | undefined;
                recordOwner?: string | undefined;
                hasFilteredServices?: unknown;
                digitalAuxiliaryMode?: boolean | undefined;
                digitalAuxiliaryThumbnail?: boolean | undefined;
                hideResourceSharing?: boolean | undefined;
                sharedDigitalCandidates?: unknown;
                consolidatedCoverage?: unknown;
                electronicContextObjectId?: unknown;
                almaOpenurl?: unknown;
                GetIt1?: {
                    category: string;
                    links: {
                        isLinktoOnline: boolean;
                        getItTabText: string;
                        adaptorid: string;
                        ilsApiId: string;
                        link: string;
                        inst4opac: string;
                        displayText: string | null;
                        '@id': string;
                    }[];
                }[] | undefined;
                physicalServiceId?: unknown;
                link?: {
                    '@id': string;
                    linkType: string;
                    linkURL: string;
                    displayLabel: string;
                }[] | undefined;
                hasD?: unknown;
            } | undefined;
            extras?: {
                citationTrails: {
                    citing: unknown[];
                    citedby: unknown[];
                };
                timesCited: Record<string, unknown>;
            } | undefined;
            enrichment?: {
                virtualBrowseObject: {
                    isVirtualBrowseEnabled: boolean;
                    callNumber: string;
                    callNumberBrowseField: string;
                };
                bibVirtualBrowseObject?: {
                    isVirtualBrowseEnabled: boolean;
                    callNumber: string;
                    callNumberBrowseField: string;
                } | undefined;
            } | undefined;
        }[];
        timelog: Record<string, string | number>;
        facets: {
            name: string;
            values: {
                value: string;
                count: string;
            }[];
        }[];
    }>;
    performSearch(query: string, addedParams?: AnyStringParams): Promise<PrimoSearchResponse>;
    request(options: any): Promise<string>;
}
//# sourceMappingURL=SearchApi.d.ts.map