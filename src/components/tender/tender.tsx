import React, {useEffect} from 'react';
import {
    Dropdown, MenuProps, Typography, Flex, Modal, Skeleton, notification, Button,
} from 'antd';
import {useNavigate} from 'react-router-dom';

import {Tender, useFinishTenderMutation} from '../../store/services/tenders/tenders.api';
import {APP_URLS} from '../../constants/urls/urls.constants';

import editIcon from '../../assets/icons/edit-2.svg';
import checkIcon from '../../assets/icons/check-square.svg';
import './tender.less';

import {LoadingWrapper} from '../common/loading-wrapper';

export interface TenderViewProps {
    tender: Tender;
}

export const TenderView = ({tender}: TenderViewProps) => {
    const {
        tenderAddress, tenderDescription, tenderStartTime, tenderEndTime, tenderType,
    } = tender;
    const navigate = useNavigate();
    const {confirm} = Modal;
    const [finishTender, {isLoading, isSuccess}] = useFinishTenderMutation();
    const showDeleteConfirm = () => {
        confirm({
            title: 'Завершить тендер?',
            content: 'Тендер пропадет из ленты, его нельзя будет запустить снова',
            okText: 'Да, завершить',
            okType: 'danger',
            cancelText: 'Нет, отменить',
            onOk() {
                finishTender({tenderId: tender.tenderId});
            },
        });
    };
    const onClick: MenuProps['onClick'] = ({key}) => {
        if (key === 'edit') {
            const formatedAppUrl = APP_URLS.EDIT_TENDER.slice(0, -4);
            navigate(`${formatedAppUrl}/${tender.tenderId}`);
        } if (key === 'end') {
            showDeleteConfirm();
        }
    };

    useEffect(() => {
        if (isSuccess) {
            notification.success({
                message: 'Тендер завершен',
            });
            navigate(APP_URLS.MY_TENDERS);
        }
    }, [isSuccess]);

    const items: MenuProps['items'] = [
        {
            label: 'Редактировать',
            key: 'edit',
            icon: <img
                src={editIcon}
                alt="edit"
                style={{width: '24px', height: '24px'}}
            />,
        },
        {
            label: 'Завершить',
            key: 'end',
            icon: <img
                src={checkIcon}
                alt="end"
                style={{width: '24px', height: '24px'}}
            />,
        },
    ];

    return (
        <Flex
            gap="middle"
            vertical
        >
            <div className="tender-view">

                {tenderType && !isLoading && (
                    <Flex
                        gap="middle"
                        vertical={false}
                        style={{width: '100%'}}
                    >

                        <Typography.Title
                            level={3}
                            style={{marginTop: '16px', width: '95%'}}
                        >
                            {tenderType.charAt(0).toUpperCase() + tenderType.slice(1)}
                        </Typography.Title>
                        <Dropdown
                            menu={{items, onClick}}
                        >
                            <Button className="dropdown-button">
                                ···
                            </Button>
                        </Dropdown>
                    </Flex>

                )}

                <Typography.Text type="secondary">
                    Даты работ: {tenderStartTime} - {tenderEndTime}
                </Typography.Text>
                <Typography.Text type="secondary">
                    {tenderAddress}
                </Typography.Text>
                <div className="description">
                    <p>{tenderDescription}</p>
                </div>

            </div>
            {isLoading && !tenderType && (
                <LoadingWrapper >
                    <Skeleton active />
                </LoadingWrapper>
            )}
        </Flex>
    );
};
