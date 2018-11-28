import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import { ProtectedRoute } from './ProtectedRoute';

import { Home } from './Home';

import { Login } from '../Account/Login';
import { Register } from '../Account/Register';

import { UserList } from '../Admin/User/UserList';
import { UserDetails } from '../Admin/User/UserDetails';
import { RecipeList } from '../Admin/Recipe/RecipeList';
import { RecipeDetails } from '../Admin/Recipe/RecipeDetails';
import { WordsList } from '../Admin/Wesketch/WordsList';

import { Wesketch } from '../Wesketch/Wesketch';
import { Mdk } from '../Mdk/Mdk';
import { Ticker } from '../Ticker/Ticker';
import { Cac } from '../Cac/Cac';

import { NotFound } from './NotFound';
import { auth } from '../../Common/AuthService';

export class Routes extends React.Component {
    public render() {
        return (
            <Switch>
                {/* Public routes */}
                <Route exact={true} path='/' component={Home} />
                <Route path='/login' component={Login} />
                <Route path='/register' component={Register} />

                {/* Protected */}
                <ProtectedRoute isAuthorized={auth.isAuthenticated()} path='/mdk' component={Mdk} />
                <ProtectedRoute isAuthorized={auth.isAuthenticated()} exact={true} path='/wesketch' component={Wesketch} />
                <ProtectedRoute isAuthorized={auth.isAuthenticated()} path='/ticker' component={Ticker} />
                <ProtectedRoute isAuthorized={auth.isAuthenticated()} path='/cac' component={Cac} />

                {/* Admin */}
                <ProtectedRoute isAuthorized={auth.isAdministrator()} exact={true} path='/users' component={UserList} />
                <ProtectedRoute isAuthorized={auth.isAdministrator()} path='/users/:id' component={UserDetails} />
                <ProtectedRoute isAuthorized={auth.isAdministrator()} exact={true} path='/recipes' component={RecipeList} />
                <ProtectedRoute isAuthorized={auth.isAdministrator()} path='/recipes/:id' component={RecipeDetails} />

                <ProtectedRoute isAuthorized={auth.isAdministrator()} exact={true} path='/wesketch/words' component={WordsList} />

                <Route component={NotFound} />
            </Switch>
        );
    }
}