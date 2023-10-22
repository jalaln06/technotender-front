import React from 'react';
import {Space, Typography} from 'antd';

import {TenderSubmission} from '../../../store/services/tenders/tenders.api';

export interface SubmissionProps extends TenderSubmission {
}

export const Submission = ({
    submissionMessage, costDuty, machineModel,
}: SubmissionProps) => (
    <div>
        <Typography.Title
            className="equipment-model"
            level={5}
        >
            {machineModel}
        </Typography.Title>
        <Space
            direction="vertical"
            size={8}
        >
            <Typography.Text type="secondary">Стоимость смены: {costDuty}</Typography.Text>
            <Typography.Text> {submissionMessage}</Typography.Text>
        </Space>
    </div>
);
