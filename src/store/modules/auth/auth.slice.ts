import {createSlice} from '@reduxjs/toolkit';

import {AuthSliceName} from './auth.slice.constants';
import {AppState} from '../../store.type';

// currently auth is dumb, we get token from telegram bot and then set it to state from path
const authSlice = createSlice({
    name: AuthSliceName,
    initialState: {
        token: null,
    } as { token: string | null },
    reducers: {
        setToken(state, action) {
            state.token = action.payload;
        },
        resetToken(state) {
            state.token = null;
        },
    },
});
const getSliceState = (state: AppState) => state[AuthSliceName];
export const authSelectors = {
    selectAuthToken: (state: AppState) => getSliceState(state).token,
};

export const {
    reducer: authReducer,
    actions: authActions,
} = authSlice;
