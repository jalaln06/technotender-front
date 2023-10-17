import {useDispatch, useSelector} from 'react-redux';
import {AnyAction, Dispatch} from '@reduxjs/toolkit';

import type {TypedUseSelectorHook} from 'react-redux';
import {AppDispatch, AppState} from '../store/store.type';

export const useAppDispatch = (): Dispatch<AnyAction> => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
