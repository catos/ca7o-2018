import * as jwt_decode from 'jwt-decode';

import { IUser, UserTypes } from '../Models/User';
import { randomHexColor } from './Utils';

class AuthService {

    public currentUser() {
        let user: IUser = {
            guid: '',
            name: '',
            username: '',
            password: '',
            type: UserTypes.NotDefined
        };

        if (this.isAuthenticated()) {
            user = jwt_decode(localStorage.getItem('token') || '') as IUser;
        }

        user.avatarUrl = `https://ui-avatars.com/api/?background=${randomHexColor()}&color=fff&size=32&name=${user.name}`;

        return user;
    }

    public isAuthenticated() {
        return localStorage.getItem('token') !== null;
    }

    public isAdministrator() {
        const result = this.isAuthenticated() && this.currentUser().type === UserTypes.Admin;
        return result;
    }

    public logout() {
        localStorage.removeItem('token');
    }
}

export const auth = new AuthService();