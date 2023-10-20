import React, {useState} from 'react';
import {
    Modal, Button, Typography, Checkbox, Divider,
} from 'antd';
import {CheckboxChangeEvent} from 'antd/es/checkbox';

import {EquipmentSelectOptions} from '../../core/models/equipment.model';

import './tender-filters-modal.less';

export const TenderFilterComponent = ({onResult}) => {
    const [modalVisibility, setModalVisibility] = useState(false);

    const handleApplyFilter = () => {
        setModalVisibility(false);
    };
    const openFilterList = () => {
        setModalVisibility(true);
    };

    const onCheckBoxChange = (e: CheckboxChangeEvent) => {
        const value = e.target.value as never;
        onResult(prevList => {
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
            <Button
                type="primary"
                onClick={openFilterList}
            >
                Открыть фильтры
            </Button>
            <Modal
                open={modalVisibility}
                title=""
                onOk={handleApplyFilter}
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
                <Typography.Title
                    level={3}
                    className="modal-title"
                >Настройка объявлений
                </Typography.Title>
                <Typography.Text
                    className="modal-subtitle"
                >Укажите типы техники по которым показывать тендеры
                </Typography.Text>
                {EquipmentSelectOptions.map(option => (
                    <>
                        <Divider className="modal-divider" />
                        <Checkbox
                            value={option.value}
                            className="filter-modal-checkbox"
                            onChange={onCheckBoxChange}
                        >{option.label}
                        </Checkbox>
                    </>
                ))}
            </Modal>
        </>
    );
};
