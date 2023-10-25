import React, {useMemo, useState} from 'react';
import {Typography} from 'antd';
import dayjs from 'dayjs';

import {TenderFilterComponent} from '../../components/tenders-filters-modal';
import {EquipmentType} from '../../core/models/equipment.model';
import {PageHead} from '../../components/common/page-head';
import {Tender, useGetTendersByEquipmentTypeQuery} from '../../store/services/tenders/tenders.api';
import {TenderListRenderer} from '../../components/tender/tender-list-renderer';
import {GroupedTendersRenderer} from '../../components/tender/grouped-tenders-renderer';

import './public-tenders.less';

export const PublicTenders = () => {
    const [selectedEquipmentTypes, setSelectedEquipmentTypes] = useState<EquipmentType[]>([]);

    const equipmentTypesForRequest = selectedEquipmentTypes.length
        ? selectedEquipmentTypes : Object.values(EquipmentType);
    const {data: tenders, isLoading} = useGetTendersByEquipmentTypeQuery(equipmentTypesForRequest);
    const handleResult = (data: React.SetStateAction<EquipmentType[]>) => {
        setSelectedEquipmentTypes(data);
    };

    const tendersGroupedByStartDay = useMemo(() => tenders?.reduce((acc, tender) => {
        const today = dayjs(new Date()).format('YYYY-MM-DD');
        const day = tender.tenderStartTime === today ? 'Сегодня' : tender.tenderStartTime;
        if (acc[day]) {
            acc[day].push(tender);
        } else {
            acc[day] = [tender];
        }
        return acc;
    }, {} as Record<string, Tender[]>) || {}, [tenders]);

    return (
        <div className="tender-page">
            <PageHead >
                <Typography.Title
                    className="tender-title"
                    level={4}
                >Тендеры
                </Typography.Title>
                <TenderFilterComponent
                    selectedEquipmentTypes={selectedEquipmentTypes}
                    onResult={handleResult}
                />
            </PageHead>
            <TenderListRenderer
                tenders={tendersGroupedByStartDay}
                isLoading={isLoading}
                listIsEmpty={Object.keys(tendersGroupedByStartDay).length === 0}
                listItemRenderer={tenderList => <GroupedTendersRenderer tenders={tenderList} />}
            />
        </div>
    );
};
