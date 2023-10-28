import {createApi} from '@reduxjs/toolkit/query/react';

import {baseQuery} from '../base-query';
import {transformNumbersBeforeNotifying} from '../tenders/tenders.utils';

export interface CreateSubmissionRequest {
    tenderId: number;
    machineModel: string;
    costDuty: number;
    submissionMessage?: string;
}

export interface ContactSubmissionAuthorRequest {
    tenderId: number;
    userId: number;
}

export const submissionsApi = createApi({
    reducerPath: 'submissionsApi',
    baseQuery: baseQuery('submission'),
    endpoints: builder => ({
        createSubmission: builder.mutation<any, CreateSubmissionRequest>({
            query: ({tenderId, ...data}) => ({
                url: '',
                method: 'POST',
                body: data,
                params: {tenderId},
            }),
        }),
        contactSubmissionAuthor: builder.mutation<any, ContactSubmissionAuthorRequest>({
            query: data => ({
                url: '/notify',
                method: 'POST',
                body: transformNumbersBeforeNotifying(data),
            }),
        }),
    }),
});

export const {useCreateSubmissionMutation, useContactSubmissionAuthorMutation} = submissionsApi;
