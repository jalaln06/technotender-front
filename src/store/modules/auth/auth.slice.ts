import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {AppState} from '../../store.type';
import {AuthSliceName, AuthSliceState, UserRole} from './auth.slice.types';

const persistedToken = localStorage.getItem('token');
const persistedUserRole = localStorage.getItem('role');

// currently auth is dumb, we get token from telegram bot and then set it to state from path
const authSlice = createSlice({
    name: AuthSliceName,
    initialState: {
        token: persistedToken ? JSON.parse(persistedToken) : null,
        user: {
            role: persistedUserRole ? JSON.parse(persistedUserRole) : null,
        },
    } as AuthSliceState,
    reducers: {
        setToken(state, action) {
            state.token = action.payload;
        },
        resetToken(state) {
            state.token = null;
        },
        setUserRole(state, action: PayloadAction<UserRole>) {
            state.user.role = action.payload;
        },
    },
});
const getSliceState = (state: AppState) => state[AuthSliceName];
export const authSelectors = {
    selectAuthToken: (state: AppState) => getSliceState(state).token,
    selectUserRole: (state: AppState) => getSliceState(state).user.role,
};

export const {
    reducer: authReducer,
    actions: authActions,
} = authSlice;
