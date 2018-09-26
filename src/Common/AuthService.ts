import * as jwt_decode from 'jwt-decode';
import * as moment from 'moment';

import { IUser, UserTypes } from '../Models/User';

interface IToken extends IUser {
    iat: number;
    exp: number;
}

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

        return user;
    }

    public isAuthenticated() {
        let result = false;
        const tokenString = localStorage.getItem('token');

        if (tokenString !== null) {
            const token = jwt_decode(tokenString) as IToken;
            if (token.exp > moment().unix()) {
                result = true;
            }
        }

        return result;
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