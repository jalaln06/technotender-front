import React from 'react';
import {Card, Typography} from 'antd';

import {formatDateDMY} from '../../constants/date.contants';

import './tender.less';

export interface Tender {
    name: string;
    period: {
        from: Date;
        to: Date;
    };
    address: string;
    description: string;
}

export interface TenderProps {
    tender: Tender;
    showDescription?: boolean;
}

export const TenderComponent = ({tender, showDescription}: TenderProps) => {
    const {
        name, period, address, description,
    } = tender;
    return (
        <Card
            className="tender-card"
            title={name}
            bordered={false}
        >
            <Typography.Text type="secondary">
                Даты работ: {formatDateDMY(period.from)} - {formatDateDMY(period.to)}
            </Typography.Text>
            <Typography.Text
                className="tender-address"
                type="secondary"
            >
                {address}
            </Typography.Text>
            {showDescription
                && (
                    <Typography.Text type="secondary">
                        {description}
                    </Typography.Text>
                )}
        </Card>
    );
};
