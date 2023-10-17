import {combineReducers} from '@reduxjs/toolkit';

import {tendersApi} from './services/tenders/tenders.api';
import {authReducer} from './modules/auth/auth.slice';
import {AuthSliceName} from './modules/auth/auth.slice.constants';

export const staticReducer = {
    [AuthSliceName]: authReducer,
    [tendersApi.reducerPath]: tendersApi.reducer,
};

export const storeReducer = combineReducers(staticReducer);
