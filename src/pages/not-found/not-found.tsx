import React from 'react';
import {Button, Result} from 'antd';
import {useNavigate} from 'react-router-dom';

import {useGetUserRoleQuery} from '../../store/services/auth/auth.api';
import {UserRoleBasedMainPage} from '../../store/modules/auth/auth.slice.types';

export const NotFound = () => {
    const navigate = useNavigate();
    const {data: userRole} = useGetUserRoleQuery();

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
