import React from 'react';
import {Button, Divider, Typography} from 'antd';
import {useNavigate} from 'react-router-dom';

import {PageHead} from '../../components/common/page-head';
import {TenderListRenderer} from '../../components/tender/tender-list-renderer';
import {useGetTendersByUserQuery} from '../../store/services/tenders/tenders.api';
import {APP_URLS} from '../../constants/urls/urls.constants';
import {TenderListItem} from '../../components/tender/tender-list-item';

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
            <Divider className="tender-divider" />
            <TenderListRenderer
                tenders={tenders}
                isLoading={isLoading}
                listIsEmpty={tenders?.length === 0}
                listItemRenderer={tendersList => tendersList.map(tender => (
                    <TenderListItem
                        key={tender.tenderId}
                        tender={tender}
                        showSubmissionCount
                        openTenderViewOnCardClick
                    />
                ))}
            />
        </div>
    );
};
