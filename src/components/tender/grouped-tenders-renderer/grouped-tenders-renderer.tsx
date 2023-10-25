import React from 'react';
import {Divider, Space} from 'antd';

import {Tender} from '../../../store/services/tenders/tenders.api';
import {TenderListItem} from '../tender-list-item';

export interface GroupedTendersRendererProps {
    tenders: Record<string, Tender[]>;
}
export const GroupedTendersRenderer = ({tenders}: GroupedTendersRendererProps) => (
    <>
        {Object.entries(tenders).map(([date, tendersByDate]) => (
            <div key={date}>
                <Divider className="tender-divider" >{date}</Divider>
                <Space
                    size={8}
                    className="tender-list"
                    direction="vertical"
                >
                    {tendersByDate.map(tender => (
                        <TenderListItem
                            tender={tender}
                            key={tender.tenderId}
                            showCreateSubmissionButton
                        />
                    ))}
                </Space>
            </div>
        ))}
    </>
);
