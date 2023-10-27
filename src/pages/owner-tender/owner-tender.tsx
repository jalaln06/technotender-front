import React, {useState} from 'react';
import {
    Button, Card, Empty, Skeleton, Typography, Dropdown,
} from 'antd';
import {useParams} from 'react-router-dom';

import {ButtonBack} from '../../components/common/buttons/button-back';
import {
    TenderSubmission, useContactSubmissionAuthorMutation, useGetTenderByIdQuery,
} from '../../store/services/tenders/tenders.api';
import {LoadingWrapper} from '../../components/common/loading-wrapper';
import {TenderView} from '../../components/tender';
import {TenderSubmissions} from '../../components/tender-submissions/tender-submissions';

import './owner-tender.less';

export const OwnerTender = () => {
    const {id} = useParams();
    const {data: tender, isLoading} = useGetTenderByIdQuery(id, {skip: !id});
    const [selectedSubmission, setSelectedSubmission] = useState<TenderSubmission | null>(null);
    const [submissionNotExists, setSubmissionNotExists] = useState<true | false>(false);
    const [notifySubmissionAuthor] = useContactSubmissionAuthorMutation();

    const handleNextSubmission = () => {
        if (tender && selectedSubmission !== null) {
            const currentIndex = tender.submission.indexOf(selectedSubmission);
            const nextIndex = currentIndex + 1;
            if (nextIndex < tender.submission.length) {
                setSelectedSubmission(tender.submission[nextIndex]);
            } else {
                setSubmissionNotExists(true);
            }
        }
    };

    const handleBackToList = () => {
        if (tender && selectedSubmission !== null) {
            setSelectedSubmission(null);
            setSubmissionNotExists(false);
        }
    };

    const handleSubmit = () => {
        if (selectedSubmission !== null) {
            notifySubmissionAuthor({
                tenderId: selectedSubmission.id.tenderId,
                userId: selectedSubmission.id.userId,
            });
        }
    };

    return (
        <Card
            className="view-tender-card"
            extra={<ButtonBack action={selectedSubmission ? () => setSelectedSubmission(null) : undefined} />}
            bordered={false}
        >

            {tender && (
                <>
                    <TenderView tender={tender} />
                    {!submissionNotExists && (
                        <>
                            <TenderSubmissions
                                submissions={tender.submission}
                                selectedSubmission={selectedSubmission}
                                setSelectedSubmission={setSelectedSubmission}
                            />
                            {selectedSubmission && (
                                <div className="controls">
                                    <Button
                                        type="default"
                                        onClick={handleNextSubmission}
                                    >
                                        Следующая
                                    </Button>
                                    <Button type="primary">
                                        Связаться
                                    </Button>
                                </div>
                            )}
                        </>
                    )}
                    {submissionNotExists && (
                        <>
                            <Typography.Title
                                level={5}
                                style={{marginTop: '16px', marginLeft: '16px'}}
                                onClick={handleSubmit}
                            >
                                Заявок больше нет!
                            </Typography.Title>
                            <Button
                                type="default"
                                onClick={handleBackToList}
                                block
                                style={{margin: '16px'}}
                            >Вернуться к списку
                            </Button>
                        </>
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
