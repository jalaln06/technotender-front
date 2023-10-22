import {createApi} from '@reduxjs/toolkit/query/react';

import {baseQuery} from '../base-query';
import {UserRole} from '../../modules/auth/auth.slice.types';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: baseQuery('auth'),
    tagTypes: ['User'],
    endpoints: builder => ({
        getUserRole: builder.query<UserRole, {token: string | null | undefined}>({
            query: () => ({
                url: '/user',
                responseHandler: 'text',
            }),
            providesTags: ['User'],
        }),
    }),
});

export const {useGetUserRoleQuery} = authApi;
