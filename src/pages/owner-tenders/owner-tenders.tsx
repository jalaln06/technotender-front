import React from 'react';
import {Button, Divider, Typography} from 'antd';
import {useNavigate} from 'react-router-dom';

import {PageHead} from '../../components/common/page-head';
import {TenderListRenderer} from '../../components/tender-list-renderer';
import {useGetTendersByUserQuery} from '../../store/services/tenders/tenders.api';
import {APP_URLS} from '../../constants/urls/urls.constants';

export const OwnerTenders = () => {
    const navigate = useNavigate();
    const {data: tenders, isLoading} = useGetTendersByUserQuery();

    return (
        <div className="tender-page">
            <PageHead >
                <Typography.Title
                    className="tender-title"
                    level={4}
                >
                    Тендеры
                </Typography.Title>
                <Button
                    type="primary"
                    onClick={() => navigate(APP_URLS.CREATE_TENDER)}
                >
                    Создать тендер
                </Button>
            </PageHead>
            <Divider className="tender-divider">Сегодня</Divider>
            <TenderListRenderer
                tenders={tenders}
                isLoading={isLoading}
                tenderItemProps={{
                    showSubmissionCount: true,
                    openTenderViewOnCardClick: true,
                }}
            />
        </div>
    );
};
