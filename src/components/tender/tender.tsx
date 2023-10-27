import React from 'react';
import {
    Dropdown, MenuProps, Typography, message, Flex,
} from 'antd';

import {Tender} from '../../store/services/tenders/tenders.api';

import editIcon from '../../assets/icons/edit-2.svg';
import checkIcon from '../../assets/icons/check-square.svg';
import './tender.less';

export interface TenderViewProps {
    tender: Tender;
}

export const TenderView = ({tender}: TenderViewProps) => {
    const {
        tenderAddress, tenderDescription, tenderStartTime, tenderEndTime, tenderType,
    } = tender;

    const onClick: MenuProps['onClick'] = ({key}) => {
        message.info(`Click on item ${key}`);
    };

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

                {tenderType && (
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
                            <a onClick={e => e.preventDefault()}>
                                <Typography.Title
                                    level={3}
                                    style={{marginTop: '16px', whiteSpace: 'nowrap', userSelect: 'none'}}
                                >
                                    ···
                                </Typography.Title>
                            </a>
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
        </Flex>
    );
};
