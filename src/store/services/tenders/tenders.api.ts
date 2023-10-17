import {createApi} from '@reduxjs/toolkit/query/react';

import {EquipmentType} from '../../../core/models/equipment.model';
import {baseQuery} from '../base-query';

// todo: should be another response
export interface GetTendersResponse {
    data: {
        name: string;
        period: {
            from: Date;
            to: Date;
        };
        address: string;
        description: string;
    }[];
}

export interface CreateTenderRequest {
    tenderAddress: string;
    tenderType?: string;
    tenderTechType: EquipmentType;
    tenderDescription: string;
    tenderCompany?: string;
    tenderStartTime: string;
    tenderAdditionalInfo?: string;
}

export const tendersApi = createApi({
    reducerPath: 'tendersApi',
    baseQuery: baseQuery('tender'),
    tagTypes: ['Tenders'],
    endpoints: builder => ({
        getTenders: builder.query<GetTendersResponse, void>({
            query: () => ({url: '/by-user'}),
            providesTags: ['Tenders'],
        }),
        createTender: builder.mutation<any, CreateTenderRequest>({
            query: data => ({
                url: '',
                method: 'POST',
                body: {...data, tenderStartTime: new Date().toISOString()},
            }),
            invalidatesTags: ['Tenders'],
        }),
    }),
});

export const {
    useGetTendersQuery,
    useCreateTenderMutation,
} = tendersApi;
