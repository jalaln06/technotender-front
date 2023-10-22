import React, {useState} from 'react';
import {
    Modal, Button, Typography, Checkbox, Divider, Badge,
} from 'antd';
import {CheckboxChangeEvent} from 'antd/es/checkbox';

import {EquipmentSelectOptions, EquipmentType} from '../../core/models/equipment.model';

import './tender-filters-modal.less';

export interface FilterProps {
    onResult: any;
    selectedEquipmentTypes: EquipmentType[];
}

export const TenderFilterComponent = ({onResult, selectedEquipmentTypes}: FilterProps) => {
    const [modalVisibility, setModalVisibility] = useState(false);

    const handleApplyFilter = () => {
        setModalVisibility(false);
    };
    const openFilterList = () => {
        setModalVisibility(true);
    };

    const onCheckBoxChange = (e: CheckboxChangeEvent) => {
        const value = e.target.value as EquipmentType;
        onResult((prevList: any) => {
            const updatedList = [...prevList];
            const index = updatedList.indexOf(value);
            if (index !== -1) {
                updatedList.splice(index, 1);
            } else {
                updatedList.push(value);
            }
            return updatedList;
        });
    };

    return (

        <>
            <Badge count={selectedEquipmentTypes.length} >
                <Button
                    type="link"
                    className="btn-link"
                    onClick={openFilterList}
                >
                    Фильтры
                </Button>
            </Badge>
            <Modal
                open={modalVisibility}
                title="Настройка объявлений"
                onOk={handleApplyFilter}
                onCancel={() => setModalVisibility(false)}
                wrapClassName="tender-filter-modal"
                footer={[
                    <div className="modal-apply-button-div">
                        <Button
                            key="back"
                            onClick={handleApplyFilter}
                            className="apply-button"
                            type="primary"
                        >
                            Применить
                        </Button>
                    </div>,
                ]}
            >
                <Typography.Text
                    className="modal-subtitle"
                >Укажите типы техники по которым показывать тендеры
                </Typography.Text>
                {EquipmentSelectOptions.map(option => (
                    <div key={option.value}>
                        <Divider className="modal-divider" />
                        <Checkbox
                            value={option.value}
                            className="filter-modal-checkbox"
                            onChange={onCheckBoxChange}
                        >{option.label}
                        </Checkbox>
                    </div>
                ))}
            </Modal>
        </>
    );
};
