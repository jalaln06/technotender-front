import {APP_URLS} from '../../../constants/urls/urls.constants';

export const AuthSliceName = 'auth';
export enum UserRole {
    OWNER = 'OWNER',
    TENDER = 'TENDER',
}

export const UserRoleBasedMainPage = {
    [UserRole.TENDER]: APP_URLS.MY_TENDERS,
    [UserRole.OWNER]: APP_URLS.PUBLIC_TENDERS,
};

export interface AuthSliceState {
    token: string | null;
    user: {
        role: UserRole;
    };
}
