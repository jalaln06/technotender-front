import React, {useState} from 'react';
import {Divider, Space, Typography} from 'antd';

import {tenders} from '../mocks';
import {TenderComponent} from '../../components/tender';
import {TenderFilterComponent} from '../../components/tenders-filters-modal';
import {useGetTendersQuery} from '../../store/services/tenders/tenders.api';

import './tenders.less';

export const Tenders = () => {
    const [checkedList, setCheckedList] = useState<never[]>([]);
    const handleResult = (data: React.SetStateAction<never[]>) => {
        setCheckedList(data);
    };
    const {data: _tenders} = useGetTendersQuery();
    console.log(_tenders);
    return (
        <div className="tender-page">
            <Typography.Title
                className="tender-title"
                level={4}
            >Тендеры
            </Typography.Title>
            <TenderFilterComponent onResult={handleResult} />
            <Divider className="tender-divider">Сегодня</Divider>
            <p>{checkedList}</p>
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
