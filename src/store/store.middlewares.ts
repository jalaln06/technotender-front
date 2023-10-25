import {tendersApi} from './services/tenders/tenders.api';
import {submissionsApi} from './services/submissions/submissions.api';
import {authApi} from './services/auth/auth.api';
import {rtkQueryErrorLogger} from './services/error-logger';

export const middlewares = [
    authApi.middleware,
    tendersApi.middleware,
    submissionsApi.middleware,
    rtkQueryErrorLogger,
];
