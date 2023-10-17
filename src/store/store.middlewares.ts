import {tendersApi} from './services/tenders/tenders.api';

export const middlewares = [
    tendersApi.middleware,
];
