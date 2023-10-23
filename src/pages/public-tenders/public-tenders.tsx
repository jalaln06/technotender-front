import React, {useState} from 'react';
import {
    Divider, Typography,
} from 'antd';

import {TenderFilterComponent} from '../../components/tenders-filters-modal';
import {EquipmentType} from '../../core/models/equipment.model';
import {PageHead} from '../../components/common/page-head';
import {useGetTendersByEquipmentTypeQuery} from '../../store/services/tenders/tenders.api';
import {TenderListRenderer} from '../../components/tender-list-renderer';

import './public-tenders.less';

export const PublicTenders = () => {
    const [selectedEquipmentTypes, setSelectedEquipmentTypes] = useState<EquipmentType[]>([]);

    const equipmentTypesForRequest = selectedEquipmentTypes.length
        ? selectedEquipmentTypes : Object.values(EquipmentType);
    const {data: tenders, isLoading} = useGetTendersByEquipmentTypeQuery(equipmentTypesForRequest);
    const handleResult = (data: React.SetStateAction<EquipmentType[]>) => {
        setSelectedEquipmentTypes(data);
    };
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
            <Divider className="tender-divider">Сегодня</Divider>
            <TenderListRenderer
                tenders={tenders}
                isLoading={isLoading}
                tenderItemProps={{
                    showCreateSubmissionButton: true,
                }}
            />
        </div>
    );
};
