import * as jwt_decode from 'jwt-decode';

import { IUser } from '../Models/User';

class AuthService {
    public currentUser(): IUser {
        return jwt_decode(localStorage.getItem('token') || '') as IUser;
    }

    public isAuthenticated() {
        return localStorage.getItem('token') !== null;
    }

    public logout() {
        localStorage.removeItem('token');
    }
}

export const auth = new AuthService();