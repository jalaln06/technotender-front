import React from 'react';
import {Button, Typography} from 'antd';
import {useNavigate} from 'react-router-dom';

import {APP_URLS} from '../../constants/urls/urls.constants';

import './tender-submission-success.less';
import submissionSuccessSvg from '../../assets/icons/submission-success.svg';

export const TenderSubmissionSuccessPage = () => {
    const navigate = useNavigate();
    return (
        <div className="tender-submission-success">
            <img
                src={submissionSuccessSvg}
                alt="submission-success"
            />
            <Typography.Title
                className="tender-title"
                level={4}
            >
                Заявка отправлена!
            </Typography.Title>
            <Typography.Text >
                Будем ждать заказчика,<br /> а пока посмотрим еще работу
            </Typography.Text>
            <Button
                type="primary"
                style={{marginTop: 20}}
                onClick={() => navigate(APP_URLS.PUBLIC_TENDERS)}
            >
                Вернуться к тендерам
            </Button>
        </div>
    );
};
