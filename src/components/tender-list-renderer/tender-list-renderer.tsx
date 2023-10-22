import React from 'react';
import {Empty, Skeleton, Space} from 'antd';

import {TenderListItem} from '../tender-list-item';
import {LoadingWrapper} from '../common/loading-wrapper';
import {Tender} from '../../store/services/tenders/tenders.api';

export interface TenderListRendererProps {
    tenders?: Tender[];
    isLoading: boolean;
    tenderItemProps?: {
        showSubmissionCount?: boolean;
        showCreateSubmissionButton?: boolean;
        openTenderViewOnCardClick?: boolean;
    };
}

export const TenderListRenderer = ({tenders, isLoading, tenderItemProps}: TenderListRendererProps) => (
    <>
        {tenders && tenders.length > 0 && (
            <Space
                size={8}
                className="tender-list"
                direction="vertical"
            >
                {tenders.map(tender => (
                    <TenderListItem
                        key={tender.tenderId}
                        tender={tender}
                        {...tenderItemProps}
                    />
                ))}
            </Space>
        )}
        {tenders && tenders.length === 0 && (
            <Empty description="По данному запросу не найдено тендеров" />
        )}
        {isLoading && (
            <LoadingWrapper >
                <Skeleton active />
                <Skeleton active />
                <Skeleton active />
            </LoadingWrapper>
        )}
    </>
);
