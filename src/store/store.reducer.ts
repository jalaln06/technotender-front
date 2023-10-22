import {combineReducers} from '@reduxjs/toolkit';

import {tendersApi} from './services/tenders/tenders.api';
import {authReducer} from './modules/auth/auth.slice';
import {submissionsApi} from './services/submissions/submissions.api';
import {AuthSliceName} from './modules/auth/auth.slice.types';
import {authApi} from './services/auth/auth.api';

export const staticReducer = {
    [AuthSliceName]: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [tendersApi.reducerPath]: tendersApi.reducer,
    [submissionsApi.reducerPath]: submissionsApi.reducer,
};

export const storeReducer = combineReducers(staticReducer);
