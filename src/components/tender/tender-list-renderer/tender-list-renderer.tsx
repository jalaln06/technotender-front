import React from 'react';
import {Empty, Skeleton, Space} from 'antd';

import {LoadingWrapper} from '../../common/loading-wrapper';

export interface TenderListRendererProps<Tenders> {
    tenders?: Tenders;
    isLoading: boolean;
    listItemRenderer: (tenders: Tenders) => React.ReactElement | React.ReactElement[];
    listIsEmpty: boolean;
}

export const TenderListRenderer = <Tenders, >({
    tenders, isLoading, listItemRenderer, listIsEmpty,
}: TenderListRendererProps<Tenders>) => (
        <>
            {tenders && !listIsEmpty && (
                <Space
                    size={8}
                    className="tender-list"
                    direction="vertical"
                >
                    {listItemRenderer(tenders)}
                </Space>
            )}
            {tenders && listIsEmpty && !isLoading && (
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
