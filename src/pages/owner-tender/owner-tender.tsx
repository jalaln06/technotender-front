import React, {useState} from 'react';
import {
    Button, Card, Empty, Skeleton,
} from 'antd';
import {useParams} from 'react-router-dom';

import {ButtonBack} from '../../components/common/buttons/button-back';
import {TenderSubmission, useGetTenderByIdQuery} from '../../store/services/tenders/tenders.api';
import {LoadingWrapper} from '../../components/common/loading-wrapper';
import {TenderView} from '../../components/tender';
import {TenderSubmissions} from '../../components/tender-submissions/tender-submissions';

export const OwnerTender = () => {
    const {id} = useParams();
    const {data: tender, isLoading} = useGetTenderByIdQuery(id, {skip: !id});
    const [selectedSubmission, setSelectedSubmission] = useState<TenderSubmission | null>(null);

    return (
        <Card
            className="view-tender-card"
            extra={<ButtonBack action={selectedSubmission ? () => setSelectedSubmission(null) : undefined} />}
            bordered={false}
        >
            {tender && (
                <>
                    <TenderView tender={tender} />
                    <TenderSubmissions
                        submissions={tender.submission}
                        selectedSubmission={selectedSubmission}
                        setSelectedSubmission={setSelectedSubmission}
                    />
                    {selectedSubmission && (
                        <div className="controls">
                            <Button type="default">Следующая</Button>
                            <Button type="primary">Связаться</Button>
                        </div>
                    )}
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
