import {fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import {AppState} from '../store.type';
import {AuthSliceName} from '../modules/auth/auth.slice.types';

export const baseQuery = (url: string) => fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/${url}`,
    prepareHeaders: (headers, {getState, endpoint}) => {
        const {token} = (getState() as AppState)[AuthSliceName];
        if (token && endpoint !== 'refresh') {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
    credentials: 'include', // This allows server to set cookies
});
