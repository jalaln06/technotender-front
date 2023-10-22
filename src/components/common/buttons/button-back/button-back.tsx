import React from 'react';
import {Button} from 'antd';
import {useNavigate} from 'react-router-dom';

import './button-back.less';
import caretLeft from '../../../../assets/icons/caret-left.svg';

export interface ButtonBackProps {
    action?: () => void;
}

export const ButtonBack = ({action}: ButtonBackProps) => {
    const navigate = useNavigate();

    return (
        <Button
            icon={(
                <img
                    src={caretLeft}
                    alt="back"
                />
            )}
            className="button-back"
            type="link"
            onClick={() => (action ? action() : navigate(-1))}
        >
            Назад
        </Button>
    );
};
