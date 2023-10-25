import React from 'react';
import {Button, Result} from 'antd';
import {useNavigate} from 'react-router-dom';

import {UserRoleBasedMainPage} from '../../store/modules/auth/auth.slice.types';
import {useAppSelector} from '../../hooks/store.hook';
import {authSelectors} from '../../store/modules/auth/auth.slice';

export const NotFound = () => {
    const navigate = useNavigate();
    const userRole = useAppSelector(authSelectors.selectUserRole);
    return (
        <Result
            status="404"
            title="404"
            subTitle="Такой страницы не существует."
            extra={(
                <Button
                    onClick={() => userRole && navigate(UserRoleBasedMainPage[userRole])}
                    type="primary"
                >Back Home
                </Button>
            )}
        />
    );
};
