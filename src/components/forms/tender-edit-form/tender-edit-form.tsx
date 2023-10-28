import React, {useEffect} from 'react';
import useForm from 'antd/lib/form/hooks/useForm';
import {
    Button,
    DatePicker,
    Form, Input, notification, Select, Skeleton, Typography,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import {useNavigate, useParams} from 'react-router-dom';
import dayjs, {Dayjs} from 'dayjs';

import {LoadingWrapper} from '../../common/loading-wrapper';
import {EditTenderFormFields} from './constants/tender-edit-form.constants';
import {
    EquipmentSelectOptions,
    EquipmentType,
} from '../../../core/models/equipment.model';
// eslint-disable-next-line max-len
import {UpdateTenderRequest, useUpdateTenderMutation, useGetTenderByIdQuery} from '../../../store/services/tenders/tenders.api';
import {APP_URLS} from '../../../constants/urls/urls.constants';

import './tender-edit-form.less';

export const TenderEditForm = () => {
    const navigate = useNavigate();
    const {id} = useParams();

    const [form] = useForm<UpdateTenderRequest>();
    const [tenderStartTime, setTenderStartTime] = React.useState<Dayjs | null>(null);
    const [tenderEndTime, setTenderEndTime] = React.useState<Dayjs | null>(null);
    const [updateTender, {isLoading, isSuccess}] = useUpdateTenderMutation();
    const handleSubmit = (values: UpdateTenderRequest) => {
        updateTender({
            ...values,
            tenderId: Number(id),
        });
    };

    const handleValuesChange = (changedValues: any) => {
        if (Object.keys(changedValues).includes(EditTenderFormFields.startTime)) {
            setTenderStartTime(changedValues[EditTenderFormFields.startTime]);
        }
        if (Object.keys(changedValues).includes(EditTenderFormFields.endTime)) {
            setTenderEndTime(changedValues[EditTenderFormFields.endTime]);
        }
    };
    const {data: tender} = useGetTenderByIdQuery(id);
    useEffect(() => {
        if (isSuccess) {
            notification.success({
                message: 'Тендер обновлен',
            });
            navigate(APP_URLS.MY_TENDERS);
        }
    }, [isSuccess]);

    useEffect(() => {
        form.setFieldsValue({
            tenderType: tender?.tenderType || '',
            tenderAddress: tender?.tenderAddress || '',
            tenderDescription: tender?.tenderDescription || '',
            tenderTechType: tender?.tenderTechType || EquipmentType.Crane,
            tenderStartTime: dayjs(tender?.tenderStartTime) || '',
            tenderEndTime: dayjs(tender?.tenderEndTime) || '',
        });
    }, [tender?.tenderType]);

    return (
        <div className="tender-edit-form">
            {tender?.tenderType && (
                <>
                    <Typography.Title
                        level={4}
                        className="title"
                    >
                        Редактирование тендера
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
                            name={EditTenderFormFields.name}
                            label="Название тендера"
                            rules={[{required: true}]}
                        >
                            <Input
                                placeholder="Введите название тендера"
                            />
                        </Form.Item>
                        <Form.Item
                            name={EditTenderFormFields.equipmentType}
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
                            name={EditTenderFormFields.startTime}
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
                            name={EditTenderFormFields.endTime}
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
                            name={EditTenderFormFields.address}
                            label="Адрес работ"
                            rules={[{required: true}]}
                        >
                            <Input
                                placeholder="Введите адрес работ"
                            />
                        </Form.Item>
                        <Form.Item
                            name={EditTenderFormFields.description}
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
                </>
            )}
            {!tender?.tenderType && (
                <LoadingWrapper >
                    <Skeleton active />
                </LoadingWrapper>
            )}
        </div>
    );
};
