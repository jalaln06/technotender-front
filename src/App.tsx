import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {useLocalStorage} from 'usehooks-ts';
import {useEffect} from 'react';

import {Tenders} from './pages/tenders';
import {CreateTenderPage} from './pages/create-tender';
import {CreateRespondPage} from './pages/create-respond';
import {AuthPage} from './pages/auth';
import {Theme} from './theme';
import {APP_URLS} from './constants/urls/urls.constants';
import {useAppDispatch, useAppSelector} from './hooks/store.hook';
import {authActions, authSelectors} from './store/modules/auth/auth.slice';
import {ProtectedRoute} from './components/routing';

const router = createBrowserRouter([
    {
        path: APP_URLS.AUTH,
        element: <AuthPage />,
    },
    {
        path: APP_URLS.TENDERS,
        element: <ProtectedRoute component={<Tenders />} />,
    },
    {
        path: APP_URLS.CREATE_TENDER,
        element: <ProtectedRoute component={<CreateTenderPage />} />,
    },
    {
        path: APP_URLS.CREATE_RESPOND,
        element: <ProtectedRoute component={<CreateRespondPage />} />,
    },
]);

export function App() {
    const dispatch = useAppDispatch();
    const token = useAppSelector(authSelectors.selectAuthToken);
    const [persistedToken] = useLocalStorage<string | null>('token', null);

    useEffect(() => {
        if (token && persistedToken !== token) {
            dispatch(authActions.setToken(token));
        }
        if (!token && persistedToken) {
            dispatch(authActions.setToken(persistedToken));
        }
    }, [persistedToken, token]);

    return (
        <div className="App">
            <Theme>
                <RouterProvider router={router} />
            </Theme>
        </div>
    );
}
