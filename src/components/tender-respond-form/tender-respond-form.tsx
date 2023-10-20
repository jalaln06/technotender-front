import React, {useEffect} from 'react';
import useForm from 'antd/lib/form/hooks/useForm';
import {
    Button, Form, Input, Typography, notification,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import {useNavigate} from 'react-router-dom';

import {CreateResponseFormFields} from './constants/tender-response-form.constants';
import {CreateResponseRequest, useCreateResponseMutation} from '../../store/services/tenders/tenders.api';
import {APP_URLS} from '../../constants/urls/urls.constants';

import './tender-respond-form.less';

export const TenderRespondForm = () => {
    const navigate = useNavigate();

    const [form] = useForm<CreateResponseRequest>();
    // todo add error logger to RTK
    const [createResponse, {isLoading, isError, isSuccess}] = useCreateResponseMutation();
    const handleSubmit = (values: CreateResponseRequest) => {
        createResponse(values);
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
        <div className="tender-respond-form">
            <Typography.Title level={4}>Название тендера</Typography.Title>
            <Typography.Text type="secondary">
                Даты работ: 24.09 — 28.09.2024
            </Typography.Text>
            <Typography.Text type="secondary">
                Адрес: СПб, Казанская 24
            </Typography.Text>
            <div className="description">
                <p>
                    Описание явление культурологического порядка образует хамбакер, однако сами песни забываются очень быстро. Соинтервалие регрессийно начинает канал. Развивая эту тему, песня "All The Things She Said" (в русском варианте - "Я сошла с ума") изящно диссонирует ритмоформульный лайн-ап. Канал, и это особенно заметно у Чарли Паркера или Джона Колтрейна, использует сет.
                </p>
            </div>
            <Typography.Title level={4}>Ваше предложение</Typography.Title>
            <Form
                layout="vertical"
                style={{
                    width: 400,
                }}
                form={form}
                onFinish={handleSubmit}
            >

                <Form.Item
                    label="Техника"
                    name={CreateResponseFormFields.name}
                >
                    <Input placeholder="Предложите технику" />
                </Form.Item>
                <Form.Item
                    label="Стоимость смены, ₽"
                    name={CreateResponseFormFields.cost}
                >
                    <Input placeholder="10 000" />
                </Form.Item>
                <Form.Item
                    label="Комментарий"
                    name={CreateResponseFormFields.responseComment}
                >
                    <TextArea
                        rows={4}
                        placeholder="Техника новая, доставка бесплатно и т.д."
                    />
                </Form.Item>
                <Button
                    style={{width: '100%'}}
                    htmlType="submit"
                    type="primary"
                    loading={isLoading}
                >
                    Предложить
                </Button>
            </Form>
        </div>
    );
};
