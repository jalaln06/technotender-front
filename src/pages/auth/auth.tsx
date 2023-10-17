import React, {useEffect} from 'react';
import {useLocalStorage} from 'usehooks-ts';
import {Navigate} from 'react-router-dom';
import {Button, Result} from 'antd';

import {useQueryParams} from '../../hooks/use-query-params.hook';
import {useAppDispatch, useAppSelector} from '../../hooks/store.hook';
import {authActions, authSelectors} from '../../store/modules/auth/auth.slice';
import {APP_URLS} from '../../constants/urls/urls.constants';

export const AuthPage = () => {
    const dispatch = useAppDispatch();
    const {getQueryParam} = useQueryParams();

    const savedToken = useAppSelector(authSelectors.selectAuthToken);
    const [_, setLocalStorageToken] = useLocalStorage<string | null>('token', null);

    const token = getQueryParam('token');

    useEffect(() => {
        if (token) {
            dispatch(authActions.setToken(token));
            setLocalStorageToken(token);
        }
    }, [token]);

    return (
        <>
            {token || savedToken ? <Navigate to={APP_URLS.TENDERS} />
                : (
                    <div style={{marginTop: 200}}>
                        <Result
                            status="warning"
                            title="Вам необходимо авторизоваться по ссылке из телаграм бота"
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
