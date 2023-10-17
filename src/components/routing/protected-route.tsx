import React from 'react';
import {Navigate} from 'react-router-dom';
import {useLocalStorage} from 'usehooks-ts';

import {APP_URLS} from '../../constants/urls/urls.constants';

export interface ProtectedRouteProps {
    component: React.ReactNode;
}

export const ProtectedRoute = ({component: Component}: ProtectedRouteProps) => {
    const [token] = useLocalStorage<string | null>('token', null);
    return token ? Component : <Navigate to={APP_URLS.AUTH} />;
};
