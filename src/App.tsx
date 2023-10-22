import {useRoutes} from 'react-router-dom';
import {useLocalStorage} from 'usehooks-ts';
import {useEffect} from 'react';

import {CreateTenderPage} from './pages/create-tender';
import {AuthPage} from './pages/auth';
import {Theme} from './theme';
import {APP_URLS} from './constants/urls/urls.constants';
import {ProtectedRoute} from './components/routing';
import {TenderSubmissionSuccessPage} from './pages/tender-submission-success';
import {useGetUserRoleQuery} from './store/services/auth/auth.api';
import {UserRole} from './store/modules/auth/auth.slice.types';
import {NotFound} from './pages/not-found/not-found';
import {PublicTenders} from './pages/public-tenders';
import {OwnerTenders} from './pages/owner-tenders';
import {PublicTenderPage} from './pages/public-tender';
import {OwnerTender} from './pages/owner-tender';

const UserRoleAwareRoutes = {
    [UserRole.TENDER]: [
        {
            path: APP_URLS.MY_TENDERS,
            element: <ProtectedRoute component={<OwnerTenders />} />,
        },
        {
            path: APP_URLS.VIEW_MY_TENDER,
            element: <ProtectedRoute component={<OwnerTender />} />,
        },
        {
            path: APP_URLS.CREATE_TENDER,
            element: <ProtectedRoute component={<CreateTenderPage />} />,
        },
    ],
    [UserRole.OWNER]: [
        {
            path: APP_URLS.PUBLIC_TENDERS,
            element: <ProtectedRoute component={<PublicTenders />} />,
        },
        {
            path: APP_URLS.VIEW_PUBLIC_TENDER,
            element: <ProtectedRoute component={<PublicTenderPage />} />,
        },
        {
            path: APP_URLS.SUBMISSION_SUCCESS,
            element: <ProtectedRoute component={<TenderSubmissionSuccessPage />} />,
        },
    ],
};

export function App() {
    const {data: userRole} = useGetUserRoleQuery({token: undefined});
    const [persistedUserRole, saveUserRoleToLocalStorage] = useLocalStorage<UserRole | null>('role', null);
    const role = userRole || persistedUserRole;

    useEffect(() => {
        if (userRole && !persistedUserRole) {
            saveUserRoleToLocalStorage(userRole);
        }
    }, [userRole, persistedUserRole]);

    const appStructure = useRoutes([
        {
            path: '*',
            element: <NotFound />,
        },
        {
            path: APP_URLS.AUTH,
            element: <AuthPage />,
        },
        ...(role ? UserRoleAwareRoutes[role] : []),
    ]);
    return (
        <div className="App">
            <Theme>
                {appStructure}
            </Theme>
        </div>
    );
}
