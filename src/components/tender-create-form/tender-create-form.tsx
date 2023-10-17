import React, {useEffect} from 'react';
import useForm from 'antd/lib/form/hooks/useForm';
import {
    Button,
    DatePicker,
    Form, Input, notification, Select, Typography,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import {useNavigate} from 'react-router-dom';

import {CreateTenderForFields} from './constants/tender-create-form.constants';
import {EquipmentSelectOptions} from '../../core/models/equipment.model';
import {CreateTenderRequest, useCreateTenderMutation} from '../../store/services/tenders/tenders.api';
import {APP_URLS} from '../../constants/urls/urls.constants';

import './tender-create-form.less';

export const TenderCreateForm = () => {
    const navigate = useNavigate();
    const [form] = useForm<CreateTenderRequest>();
    // todo add error logger to RTK
    const [createTender, {isLoading, isError, isSuccess}] = useCreateTenderMutation();

    const handleSubmit = (values: CreateTenderRequest) => {
        createTender(values);
    };

    useEffect(() => {
        if (isSuccess) {
            notification.success({
                message: 'Тендер создан',
            });
            navigate(APP_URLS.TENDERS);
        }
    }, [isSuccess]);

    return (
        <div className="tender-create-form">
            <Typography.Title level={4}>Новый тендер</Typography.Title>
            <Form
                layout="vertical"
                form={form}
                onFinish={handleSubmit}
            >
                <Form.Item
                    name={CreateTenderForFields.equipmentType}
                    label="Тип техники"
                >
                    <Select
                        showSearch
                        options={EquipmentSelectOptions}
                        placeholder="Выберите технику"
                    />
                </Form.Item>
                <Form.Item
                    name={CreateTenderForFields.startTime}
                    label="Даты работ"
                >
                    <DatePicker.RangePicker />
                </Form.Item>
                <Form.Item
                    name={CreateTenderForFields.address}
                    label="Адрес работ"
                >
                    <Input placeholder="Введите адрес работ" />
                </Form.Item>
                <Form.Item
                    name={CreateTenderForFields.description}
                    label="Описание"
                >
                    <TextArea
                        rows={4}
                        placeholder="Введите описание"
                    />
                </Form.Item>
                <Button
                    style={{width: '100%'}}
                    htmlType="submit"
                    type="primary"
                    loading={isLoading}
                >
                    Сохранить
                </Button>
            </Form>
        </div>
    );
};