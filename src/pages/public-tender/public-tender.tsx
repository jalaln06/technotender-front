import React from 'react';
import {useParams} from 'react-router-dom';
import {
    Card, Empty, Skeleton,
} from 'antd';

import {TenderView} from '../../components/tender';
import {useGetTenderByIdQuery} from '../../store/services/tenders/tenders.api';
import {LoadingWrapper} from '../../components/common/loading-wrapper';
import {TenderResponseForm} from '../../components/forms/tender-respond-form';
import {ButtonBack} from '../../components/common/buttons/button-back';

import './public-tender.less';

export const PublicTenderPage = () => {
    const {id} = useParams();
    const {data: tender, isLoading} = useGetTenderByIdQuery(id, {skip: !id});

    return (
        <Card
            className="view-tender-card"
            extra={<ButtonBack />}
            bordered={false}
        >
            {tender && (
                <>
                    <TenderView tender={tender} />
                    <TenderResponseForm tenderId={tender.tenderId} />
                </>
            )}
            {isLoading && (
                <LoadingWrapper >
                    <Skeleton active />
                </LoadingWrapper>
            )}
            {!isLoading && !tender && (
                <Empty description="Тендер не найден" />
            )}
        </Card>
    );
};
