import {Store} from '@reduxjs/toolkit';

import {storeReducer} from './store.reducer';
import {store} from './store';

export type AppState<T = unknown> = ReturnType<typeof storeReducer> & Record<string, T>;
export type AppDispatch = typeof store.dispatch;

export type AppStore = Store;
