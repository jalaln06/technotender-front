import {createApi} from '@reduxjs/toolkit/query/react';

import {baseQuery} from '../base-query';

export interface CreateSubmissionRequest {
    tenderId: number;
    machineModel: string;
    costDuty: number;
    submissionMessage?: string;
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
    }),
});

export const {useCreateSubmissionMutation} = submissionsApi;
