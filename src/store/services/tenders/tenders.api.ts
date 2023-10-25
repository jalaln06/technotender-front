import {createApi} from '@reduxjs/toolkit/query/react';
import {z} from 'zod';
import {Dayjs} from 'dayjs';

import {EquipmentType} from '../../../core/models/equipment.model';
import {baseQuery} from '../base-query';
import {transformNumbersBeforeNotifying, transformTenderBeforeCreateRequest} from './tenders.utils';

const TenderSchema = z.object({
    tenderId: z.number(),
    tenderType: z.string().nullish(),
    tenderTechType: z.nativeEnum(EquipmentType),
    tenderDescription: z.string().nullish(),
    tenderCompany: z.string().nullish(),
    tenderStartTime: z.string(),
    tenderEndTime: z.string(),
    tenderAddress: z.string(),
    tenderFinished: z.boolean(),
    submission: z.array(z.object(
        {
            id: z.object({
                userId: z.number(),
                tenderId: z.number(),
            }),
            costDuty: z.string(),
            machinePerformance: z.string().nullish(),
            machineModel: z.string(),
            submissionTime: z.string(),
            submissionMessage: z.string().nullish(),
        },
    )),
});

export type Tender = z.infer<typeof TenderSchema>;
export type TenderSubmission = z.infer<typeof TenderSchema>['submission'][0];

export interface CreateTenderRequest {
    tenderAddress: string;
    tenderType?: string;
    tenderTechType: EquipmentType;
    tenderDescription: string;
    tenderCompany?: string;
    tenderStartTime: Dayjs;
    tenderEndTime: Dayjs;
    tenderAdditionalInfo?: string;
}

export interface ContactSubmissionAuthorRequest {
    tenderId: number;
    userId: number;
}

export const tendersApi = createApi({
    reducerPath: 'tendersApi',
    baseQuery: baseQuery('tender'),
    tagTypes: ['Tenders'],
    endpoints: builder => ({
        getTendersByUser: builder.query<Tender[], void>({
            query: () => ({url: '/by-user'}),
            providesTags: ['Tenders'],
            transformResponse: (response: Tender[]) => {
                response.forEach(v => {
                    TenderSchema.parse(v);
                });
                return response;
            },
        }),

        getTendersByEquipmentType: builder.query<Tender[], EquipmentType[]>({
            query: equipmentTypes => ({url: '/byEquipmentTypes', params: {equipmentTypes}}),
            providesTags: ['Tenders'],
            transformResponse: (response: Tender[]) => {
                response.forEach(v => {
                    TenderSchema.parse(v);
                });
                return response;
            },
        }),

        getTenderById: builder.query<Tender, string | undefined>({
            query: id => ({url: `/${id || ''}`}),
            transformResponse: (response: Tender) => {
                TenderSchema.parse(response);
                return response;
            },
        }),

        createTender: builder.mutation<any, CreateTenderRequest>({
            query: data => ({
                url: '',
                method: 'POST',
                body: transformTenderBeforeCreateRequest(data),
            }),
            invalidatesTags: ['Tenders'],
        }),

        contactSubmissionAuthor: builder.mutation<any, ContactSubmissionAuthorRequest>({
            query: data => ({
                url: '/notify',
                method: 'POST',
                body: transformNumbersBeforeNotifying(data),
            }),
            invalidatesTags: ['Tenders'],
        }),
    }),
});

export const {
    useGetTendersByUserQuery,
    useGetTendersByEquipmentTypeQuery,
    useGetTenderByIdQuery,
    useCreateTenderMutation,
    useContactSubmissionAuthorMutation,
} = tendersApi;
