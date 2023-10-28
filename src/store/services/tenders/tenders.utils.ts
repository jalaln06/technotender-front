import {ContactSubmissionAuthorRequest} from '../submissions/submissions.api';
import {
    CreateTenderRequest, FinishRenderRequest, UpdateTenderRequest,
} from './tenders.api';

export const transformTenderBeforeCreateRequest = (tender: CreateTenderRequest) => ({
    ...tender,
    tenderStartTime: tender.tenderStartTime.format('YYYY-MM-DD'),
    tenderEndTime: tender.tenderStartTime.format('YYYY-MM-DD'),
});
export const transformNumbersBeforeNotifying = (req: ContactSubmissionAuthorRequest) => ({
    ...req,
    tenderId: req.tenderId.toString(),
    userId: req.userId.toString(),
});
export const deleteIdBeforeCreateRequest = (req: UpdateTenderRequest) => {
    const {tenderId, ...rest} = req;
    return {
        ...rest,
        tenderStartTime: req.tenderStartTime.format('YYYY-MM-DD'),
        tenderEndTime: req.tenderStartTime.format('YYYY-MM-DD'),
    };
};
export const transformNumbersBeforeFinishing = (req: FinishRenderRequest) => ({
    ...req,
    tenderId: req.tenderId.toString(),
});
