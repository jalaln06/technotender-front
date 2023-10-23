import React, {useEffect} from 'react';
import {useLocalStorage} from 'usehooks-ts';
import {Navigate} from 'react-router-dom';
import {Button, Result} from 'antd';

import {useQueryParams} from '../../hooks/use-query-params.hook';
import {useAppDispatch, useAppSelector} from '../../hooks/store.hook';
import {authActions, authSelectors} from '../../store/modules/auth/auth.slice';
import {useGetUserRoleQuery} from '../../store/services/auth/auth.api';
import {UserRoleBasedMainPage} from '../../store/modules/auth/auth.slice.types';

export const AuthPage = () => {
    const dispatch = useAppDispatch();
    const {getQueryParam} = useQueryParams();

    const savedToken = useAppSelector(authSelectors.selectAuthToken);
    const [_, setLocalStorageToken] = useLocalStorage<string | null>('token', null);

    const token = getQueryParam('token');
    const {data: userRole} = useGetUserRoleQuery({token: token || savedToken});

    useEffect(() => {
        if (token) {
            dispatch(authActions.setToken(token));
            setLocalStorageToken(token);
        }
    }, [token]);

    return (
        <>
            {(token || savedToken) && userRole ? <Navigate to={UserRoleBasedMainPage[userRole]} />
                : (
                    <div style={{marginTop: 200}}>
                        <Result
                            status="warning"
                            title="Вам необходимо авторизоваться по ссылке из телеграмм бота"
                            extra={(
                                <Button type="primary">
                                    Перейти в бота
                                </Button>
                            )}
                        />
                    </div>
                )}
        </>
    );
};
