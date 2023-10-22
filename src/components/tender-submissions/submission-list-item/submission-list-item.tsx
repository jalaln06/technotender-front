import React from 'react';
import {Card, Typography} from 'antd';

import {TenderSubmission} from '../../../store/services/tenders/tenders.api';

import caretLeft from '../../../assets/icons/caret-left.svg';
import './submission-list-item.less';

export interface SubmissionListItemProps extends TenderSubmission {
    onSubmissionClick: () => void;
}
export const SubmissionListItem = ({costDuty, machineModel, onSubmissionClick}: SubmissionListItemProps) => (
    <Card
        onClick={onSubmissionClick}
        className="submission-list-item-card"
    >
        <div className="content">
            <div>
                <Typography.Title
                    // todo: разабраться ellipsis
                    // ellipsis
                    className="equipment-model"
                    level={5}
                >
                    {machineModel}
                </Typography.Title>
                <Typography.Text type="secondary">Стоимость смены: {costDuty}</Typography.Text>
            </div>
            <div >
                <img
                    className="caret"
                    src={caretLeft}
                    alt="caret"
                />
            </div>
        </div>
    </Card>
);
