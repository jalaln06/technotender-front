import {CreateTenderRequest} from './tenders.api';

export const transformTenderBeforeCreateRequest = (tender: CreateTenderRequest) => ({
    ...tender,
    tenderStartTime: tender.tenderStartTime.format('YYYY-MM-DD'),
    tenderEndTime: tender.tenderStartTime.format('YYYY-MM-DD'),
});
