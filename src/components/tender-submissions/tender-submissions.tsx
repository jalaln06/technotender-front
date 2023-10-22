import React from 'react';
import {Divider} from 'antd';

import {TenderSubmission} from '../../store/services/tenders/tenders.api';
import {SubmissionListItem} from './submission-list-item';
import {Submission} from './submission/submission';

export interface TenderSubmissionsProps {
    submissions: TenderSubmission[];
    selectedSubmission: TenderSubmission | null;
    setSelectedSubmission: (submission: TenderSubmission | null) => void;
}
export const TenderSubmissions = ({
    submissions,
    selectedSubmission,
    setSelectedSubmission,
}: TenderSubmissionsProps) => (selectedSubmission === null ? (
    <>
        <Divider>Заявки</Divider>
        {submissions.map(submission => (
            <SubmissionListItem
                {...submission}
                key={submission.submissionTime + submission.submissionMessage}
                onSubmissionClick={() => setSelectedSubmission(submission)}
            />
        ))}
    </>
) : (
    <>
        <Divider>Заявка</Divider>
        <Submission {...selectedSubmission} />
    </>
)
);
