import React, {useState} from 'react';
import {
    Modal, Button, Typography, Checkbox, Divider,
} from 'antd';

import {EquipmentSelectOptions} from '../../core/models/equipment.model';

import './tender-filters-modal.less';

export const TenderFilterComponent = () => {
    const [openModal, setOpenModal] = useState(false);
    const handleApply = () => {
        setOpenModal(false);
    };
    const openFilterList = () => {
        setOpenModal(true);
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
                open={openModal}
                title=""
                onOk={handleApply}
                onCancel={handleApply}
                wrapClassName="tender-filter-modal"
                footer={[
                    <div className="modal-apply-button-div">
                        <Button
                            key="back"
                            onClick={handleApply}
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
                <Typography.Title
                    level={5}
                    className="modal-subtitle"
                >Укажите типы техники по которым показывать тендеры
                </Typography.Title>
                {EquipmentSelectOptions.map(option => (
                    <>
                        <Divider className="modal-divider" />
                        <Checkbox
                            value={option.value}
                            className="filter-modal-checkbox"
                        >{option.label}
                        </Checkbox>
                    </>
                ))}
            </Modal>
        </>
    );
};
