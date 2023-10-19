import React from 'react';
import {
    Button, Form, Input, Typography,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import {useNavigate} from 'react-router-dom';

import {APP_URLS} from '../../constants/urls/urls.constants';

import './tender-respond-form.less';

export const TenderRespondForm = () => {
    const navigate = useNavigate();
    const handleSubmit = () => {
        navigate(APP_URLS.TENDERS);
    };
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
                onFinish={handleSubmit}
            >

                <Form.Item label="Техника">
                    <Input placeholder="Предложите технику" />
                </Form.Item>
                <Form.Item label="Стоимость смены, ₽">
                    <Input placeholder="10 000" />
                </Form.Item>
                <Form.Item label="Комментарий">
                    <TextArea
                        rows={4}
                        placeholder="Техника новая, доставка бесплатно и т.д."
                    />
                </Form.Item>
                <Button
                    style={{width: '100%'}}
                    htmlType="submit"
                    type="primary"
                >
                    Предложить
                </Button>
            </Form>
        </div>
    );
};
