import {isRejectedWithValue} from '@reduxjs/toolkit';
import {notification} from 'antd';

import type {MiddlewareAPI, Middleware} from '@reduxjs/toolkit';

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => next => action => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
        console.warn('We got a rejected action!');
        notification.error({message: 'Произошла непредвиденная ошибка!', description: action.error.data.message});
    }

    return next(action);
};
