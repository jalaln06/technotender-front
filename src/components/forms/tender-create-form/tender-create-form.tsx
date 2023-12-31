import React, {useEffect} from 'react';
import useForm from 'antd/lib/form/hooks/useForm';
import {
    Button,
    DatePicker,
    Form, Input, notification, Select, Typography,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import {useNavigate} from 'react-router-dom';
import {Dayjs} from 'dayjs';

import {CreateTenderFormFields} from './constants/tender-create-form.constants';
import {EquipmentSelectOptions} from '../../../core/models/equipment.model';
import {CreateTenderRequest, useCreateTenderMutation} from '../../../store/services/tenders/tenders.api';
import {APP_URLS} from '../../../constants/urls/urls.constants';

import './tender-create-form.less';

export const TenderCreateForm = () => {
    const navigate = useNavigate();

    const [form] = useForm<CreateTenderRequest>();
    const [tenderStartTime, setTenderStartTime] = React.useState<Dayjs | null>(null);
    const [tenderEndTime, setTenderEndTime] = React.useState<Dayjs | null>(null);

    const [createTender, {isLoading, isSuccess}] = useCreateTenderMutation();
    const handleSubmit = (values: CreateTenderRequest) => {
        createTender(values);
    };

    const handleValuesChange = (changedValues: any) => {
        if (Object.keys(changedValues).includes(CreateTenderFormFields.startTime)) {
            setTenderStartTime(changedValues[CreateTenderFormFields.startTime]);
        }
        if (Object.keys(changedValues).includes(CreateTenderFormFields.endTime)) {
            setTenderEndTime(changedValues[CreateTenderFormFields.endTime]);
        }
    };

    useEffect(() => {
        if (isSuccess) {
            notification.success({
                message: 'Тендер создан',
            });
            navigate(APP_URLS.MY_TENDERS);
        }
    }, [isSuccess]);

    return (
        <div className="tender-create-form">
            <Typography.Title
                level={4}
                className="title"
            >
                Новый тендер
            </Typography.Title>
            <Form
                layout="vertical"
                form={form}
                style={{
                    width: '100%',
                    marginTop: '20px',
                }}
                onFinish={handleSubmit}
                validateMessages={{
                    required: 'Пожалуйста, заполните это поле',
                }}
                onValuesChange={changedValues => handleValuesChange(changedValues)}
            >
                <Form.Item
                    name={CreateTenderFormFields.name}
                    label="Название тендера"
                    rules={[{required: true}]}
                >
                    <Input
                        placeholder="Введите название тендера"
                    />
                </Form.Item>
                <Form.Item
                    name={CreateTenderFormFields.equipmentType}
                    label="Тип техники"
                    rules={[{required: true}]}
                >
                    <Select
                        showSearch
                        filterOption={(input: string, option: any) => option?.label?.toLowerCase()
                            .includes(input.toLowerCase())}
                        options={EquipmentSelectOptions}
                        placeholder="Выберите технику"
                    />
                </Form.Item>
                <Form.Item
                    name={CreateTenderFormFields.startTime}
                    label="Дата начала работ"
                    rules={[{required: true}]}
                >
                    <DatePicker
                        style={{width: '100%'}}
                        disabledDate={d => d.isBefore(new Date()) || d.isAfter(tenderEndTime)}
                        placeholder="Выберите дату"
                    />
                </Form.Item>
                <Form.Item
                    name={CreateTenderFormFields.endTime}
                    label="Дата окончания работ"
                    rules={[{required: true}]}
                >
                    <DatePicker
                        style={{width: '100%'}}
                        disabled={!tenderStartTime}
                        disabledDate={d => d.isBefore(tenderStartTime)}
                        placeholder="Выберите дату"
                    />
                </Form.Item>
                <Form.Item
                    name={CreateTenderFormFields.address}
                    label="Адрес работ"
                    rules={[{required: true}]}
                >
                    <Input placeholder="Введите адрес работ" />
                </Form.Item>
                <Form.Item
                    name={CreateTenderFormFields.description}
                    label="Описание"
                >
                    <TextArea
                        rows={4}
                        placeholder="Расскажите что придется делать, условия труда, оплата доставки и т.д."
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
