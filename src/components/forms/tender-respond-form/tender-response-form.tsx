import React, {useEffect} from 'react';
import useForm from 'antd/lib/form/hooks/useForm';
import {
    Button, Form, Input, Typography, notification,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import {useNavigate} from 'react-router-dom';
import {useMediaQuery} from 'usehooks-ts';

import {CreateResponseFormFields} from './constants/tender-response-form.constants';
import {APP_URL_BLOCK} from '../../../constants/urls/urls.constants';
import {
    CreateSubmissionRequest,
    useCreateSubmissionMutation,
} from '../../../store/services/submissions/submissions.api';

import './tender-respond-form.less';

export interface TenderResponseFormProps {
    tenderId: number;
}

export const TenderResponseForm = ({tenderId}: TenderResponseFormProps) => {
    const navigate = useNavigate();
    const isLowResolution = useMediaQuery('(max-width: 400px)');

    const [form] = useForm<CreateSubmissionRequest>();
    const [createResponse, {isLoading, isSuccess}] = useCreateSubmissionMutation();
    const handleSubmit = (values: CreateSubmissionRequest) => {
        createResponse({...values, tenderId});
    };

    useEffect(() => {
        if (isSuccess) {
            notification.success({
                message: 'Заявка успешно отправлена',
            });
            navigate(APP_URL_BLOCK.SUBMISSION_SUCCESS, {replace: false});
        }
    }, [isSuccess]);

    return (
        <div className="tender-respond-form">
            <Typography.Title
                className="title"
                level={4}
            >
                Ваше предложение
            </Typography.Title>
            <Form
                layout="vertical"
                style={{
                    width: '100%',
                    marginTop: '20px',
                }}
                form={form}
                onFinish={handleSubmit}
                validateMessages={{
                    required: 'Пожалуйста, заполните это поле',
                }}
            >
                <Form.Item
                    label="Техника"
                    name={CreateResponseFormFields.name}
                    rules={[{required: true}]}
                >
                    <Input placeholder="Предложите технику" />
                </Form.Item>
                <Form.Item
                    label="Стоимость смены, ₽"
                    name={CreateResponseFormFields.cost}
                    rules={[{required: true}]}
                >
                    <Input placeholder="Введите стоимость" />
                </Form.Item>
                <Form.Item
                    label="Комментарий"
                    name={CreateResponseFormFields.responseComment}
                >
                    <TextArea
                        rows={4}
                        placeholder="Описание техники"
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
