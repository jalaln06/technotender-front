import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import {EquipmentType} from '../../../core/models/equipment.model';

export interface GetTendersRequest {
    techType: EquipmentType;
}

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

export const tendersApi = createApi({
    reducerPath: 'tendersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_API_URL}/tender`,
    }),
    tagTypes: ['Tenders'],
    endpoints: builder => ({
        getTenders: builder.query<GetTendersRequest, GetTendersRequest>({
            query: args => ({url: '/', params: {...args}}),
            providesTags: ['Tenders'],
        }),
    }),
});

export const {useGetTendersQuery} = tendersApi;
