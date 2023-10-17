import React from 'react';
import {Divider, Space, Typography} from 'antd';

import {tenders} from '../mocks';
import {TenderComponent} from '../../components/tender';
import {useGetTendersQuery} from '../../store/services/tenders/tenders.api';

import './tenders.less';

export const Tenders = () => {
    // should be used when api will be implemented
    const {data: _tenders} = useGetTendersQuery();
    console.log(tenders);
    return (
        <div className="tender-page">
            <Typography.Title
                className="tender-title"
                level={4}
            >Тендеры
            </Typography.Title>
            <Divider className="tender-divider">Сегодня</Divider>
            <Space
                direction="vertical"
                size={8}
            >
                {tenders.map(tender => (
                    <TenderComponent tender={tender} />
                ))}
            </Space>
        </div>
    );
};
