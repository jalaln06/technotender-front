import React from 'react';
import {
    Card, Typography, Button, Badge, Tooltip,
} from 'antd';
import {useNavigate} from 'react-router-dom';
import cn from 'classnames';

import {APP_URLS} from '../../../constants/urls/urls.constants';
import {Tender} from '../../../store/services/tenders/tenders.api';

import './tender-list-item.less';

export interface TenderProps {
    tender: Tender;
    showDescription?: boolean;
    showSubmissionCount?: boolean;
    showCreateSubmissionButton?: boolean;
    openTenderViewOnCardClick?: boolean;
}

export const TenderListItem = ({
    tender, showDescription, showSubmissionCount, showCreateSubmissionButton, openTenderViewOnCardClick,
}: TenderProps) => {
    const navigate = useNavigate();
    const {
        tenderAddress, tenderDescription, tenderStartTime, tenderEndTime, tenderType, submission,
    } = tender;
    const handleOpenRespond = () => {
        navigate(`${APP_URLS.PUBLIC_TENDERS}/${tender.tenderId}`);
    };

    const handleOpenTenderView = () => {
        navigate(tender.tenderId.toString(), {replace: false});
    };

    return (
        <Card
            className={cn('tender-card', {clickable: openTenderViewOnCardClick})}
            title={tenderType}
            bordered={false}
            onClick={openTenderViewOnCardClick ? handleOpenTenderView : undefined}
            extra={(
                <>
                    {showCreateSubmissionButton && (
                        <Button
                            type="primary"
                            shape="round"
                            size="small"
                            onClick={handleOpenRespond}
                        >
                            Откликнуться
                        </Button>
                    )}
                    {showSubmissionCount && (
                        <Tooltip title="Количество откликов" >
                            <Badge
                                showZero
                                color="#007AFF"
                                count={submission.length}
                            />
                        </Tooltip>
                    )}
                </>
            )}
        >
            <Typography.Text type="secondary">
                Даты работ: {tenderStartTime} - {tenderEndTime}
            </Typography.Text>
            <Typography.Text
                className="tender-address"
                type="secondary"
            >
                {tenderAddress}
            </Typography.Text>
            {showDescription
                && (
                    <Typography.Text type="secondary">
                        {tenderDescription}
                    </Typography.Text>
                )}
        </Card>
    );
};
