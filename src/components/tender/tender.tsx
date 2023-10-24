import React from 'react';
import {Typography} from 'antd';

import {Tender} from '../../store/services/tenders/tenders.api';

import './tender.less';

export interface TenderViewProps {
    tender: Tender;
}

export const TenderView = ({tender}: TenderViewProps) => {
    const {
        tenderAddress, tenderDescription, tenderStartTime, tenderEndTime, tenderType,
    } = tender;

    return (
        <div className="tender-view">
            {tenderType && (
                <Typography.Title level={3}>
                    {tenderType.charAt(0).toUpperCase() + tenderType.slice(1)}
                </Typography.Title>
            )}
            <Typography.Text type="secondary">
                Даты работ: {tenderStartTime} - {tenderEndTime}
            </Typography.Text>
            <Typography.Text type="secondary">
                {tenderAddress}
            </Typography.Text>
            <div className="description">
                <p>{tenderDescription}</p>
            </div>
        </div>
    );
};
