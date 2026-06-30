import { z } from 'zod';
const stringArrayRecordSchema = z.record(z.string(), z.array(z.string()));
const unknownRecordSchema = z.record(z.string(), z.unknown());
const unknownArraySchema = z.array(z.unknown());
export const facetSchema = z.object({
    name: z.string(),
    values: z.array(z.object({
        value: z.string(),
        count: z.string(),
    })),
});
export const pnxSchema = z.object({
    search: stringArrayRecordSchema.optional(),
    display: stringArrayRecordSchema.optional(),
    delivery: stringArrayRecordSchema.optional(),
    links: stringArrayRecordSchema.optional(),
    addata: stringArrayRecordSchema.optional(),
    facets: stringArrayRecordSchema.optional(),
    sort: stringArrayRecordSchema.optional(),
    control: unknownRecordSchema.optional(),
});
export const holdingMatchSchema = z.object({
    matchOn: z.string(),
    holdingRecord: z.string(),
});
export const holdingSchema = z.object({
    isValidUser: z.boolean(),
    organization: z.string(),
    libraryCode: z.string(),
    availabilityStatus: z.string(),
    subLocation: z.string(),
    subLocationCode: z.string(),
    mainLocation: z.string(),
    callNumber: z.string(),
    callNumberType: z.string(),
    holdingURL: z.string(),
    adaptorid: z.string(),
    ilsApiId: z.string(),
    holdId: z.string(),
    holKey: z.string(),
    matchForHoldings: z.array(holdingMatchSchema),
    stackMapUrl: z.string(),
    relatedTitle: z.string().nullable(),
    translateRelatedTitle: z.string().nullable(),
    yearFilter: z.string().nullable(),
    volumeFilter: z.string().nullable(),
    singleUnavailableItemProcessType: z.string().nullable(),
    boundWith: z.boolean(),
    '@id': z.string(),
});
export const getItLinkSchema = z.object({
    isLinktoOnline: z.boolean(),
    getItTabText: z.string(),
    adaptorid: z.string(),
    ilsApiId: z.string(),
    link: z.string(),
    inst4opac: z.string(),
    displayText: z.string().nullable(),
    '@id': z.string(),
});
export const getItSchema = z.object({
    category: z.string(),
    links: z.array(getItLinkSchema),
});
export const deliveryLinkSchema = z.object({
    '@id': z.string(),
    linkType: z.string(),
    linkURL: z.string(),
    displayLabel: z.string(),
});
export const deliverySchema = z.object({
    fulltext: z.array(z.string()).optional(),
    delcategory: z.array(z.string()).optional(),
    bestlocation: holdingSchema.optional().nullable(),
    holding: z.array(holdingSchema).optional().nullable(),
    electronicServices: z.unknown().optional(),
    additionalElectronicServices: z.unknown().optional(),
    filteredByGroupServices: z.unknown().optional(),
    quickAccessService: z.unknown().optional(),
    deliveryCategory: z.array(z.string()).optional(),
    serviceMode: z.array(z.string()).optional(),
    availability: z.array(z.string()).optional(),
    availabilityLinks: z.array(z.string()).optional().nullable(),
    availabilityLinksUrl: z.array(z.string()).optional().nullable(),
    displayedAvailability: z.unknown().optional(),
    displayLocation: z.boolean().optional().nullable(),
    additionalLocations: z.boolean().optional().nullable(),
    physicalItemTextCodes: z.unknown().optional(),
    feDisplayOtherLocations: z.boolean().optional().nullable(),
    almaInstitutionsList: unknownArraySchema.optional(),
    recordInstitutionCode: z.string().nullish(),
    recordOwner: z.string().optional(),
    hasFilteredServices: z.unknown().optional(),
    digitalAuxiliaryMode: z.boolean().optional(),
    digitalAuxiliaryThumbnail: z.boolean().optional(),
    hideResourceSharing: z.boolean().optional(),
    sharedDigitalCandidates: z.unknown().optional(),
    consolidatedCoverage: z.unknown().optional(),
    electronicContextObjectId: z.unknown().optional(),
    almaOpenurl: z.unknown().optional(),
    GetIt1: z.array(getItSchema).optional(),
    physicalServiceId: z.unknown().optional(),
    link: z.array(deliveryLinkSchema).optional(),
    hasD: z.unknown().optional(),
});
export const extrasSchema = z.object({
    citationTrails: z.object({
        citing: unknownArraySchema,
        citedby: unknownArraySchema,
    }),
    timesCited: unknownRecordSchema,
});
export const virtualBrowseSchema = z.object({
    isVirtualBrowseEnabled: z.boolean(),
    callNumber: z.string(),
    callNumberBrowseField: z.string(),
});
export const enrichmentSchema = z.object({
    virtualBrowseObject: virtualBrowseSchema,
    bibVirtualBrowseObject: virtualBrowseSchema.optional(),
});
export const docSchema = z.object({
    context: z.string(),
    adaptor: z.string(),
    '@id': z.string(),
    pnx: pnxSchema,
    delivery: deliverySchema.optional(),
    extras: extrasSchema.optional(),
    enrichment: enrichmentSchema.optional(),
});
export const primoSearchResponseSchema = z.object({
    info: z.object({
        totalResultsLocal: z.number(),
        totalResultsPC: z.number(),
        total: z.number(),
        first: z.number(),
        last: z.number(),
    }),
    highlights: z.object({
        termsUnion: z.array(z.string()),
    }),
    docs: z.array(docSchema),
    timelog: z.record(z.string(), z.union([z.string(), z.number()])),
    facets: z.array(facetSchema),
});
