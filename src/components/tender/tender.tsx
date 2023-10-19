import React from 'react';
import {Card, Typography, Button} from 'antd';

import {formatDateDMY} from '../../constants/date.contants';
import {useNavigate} from 'react-router-dom';
import {APP_URLS} from '../../constants/urls/urls.constants';
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
	const navigate = useNavigate();
    const handleOpenRespond = () => {
        navigate(APP_URLS.CREATE_RESPOND);
    };
    const {
        name, period, address, description,
    } = tender;
    return (
        <Card
            className="tender-card"
            title={name}
            bordered={false}
			extra={<Button type="primary" shape="round" size="small" onClick={handleOpenRespond}>Откликнуться</Button>}
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
