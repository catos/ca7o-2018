import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import { PrivateRoute } from './PrivateRoute';

import { Home } from './Home';

import { Login } from '../Account/Login';
import { Register } from '../Account/Register';

import { UserList } from '../Admin/User/UserList';
import { UserDetails } from '../Admin/User/UserDetails';
import { RecipeList } from '../Admin/Recipe/RecipeList';
import { RecipeDetails } from '../Admin/Recipe/RecipeDetails';

import { Wesketch } from '../Wesketch/Wesketch';
import { Mdk } from '../Mdk/Mdk';
import { Ticker } from '../Ticker/Ticker';

import { NotFound } from './NotFound';

export class Routes extends React.Component {
    public render() {
        return (
            <Switch>
                {/* Public routes */}
                <Route exact={true} path='/' component={Home} />
                <Route path='/login' component={Login} />
                <Route path='/register' component={Register} />

                {/* Protected */}
                <PrivateRoute path='/mdk' component={Mdk} />
                <PrivateRoute path='/wesketch' component={Wesketch} />
                <PrivateRoute path='/ticker' component={Ticker} />

                {/* Admin */}
                <PrivateRoute exact={true} path='/users' component={UserList} />
                <PrivateRoute path='/users/:id' component={UserDetails} />
                <PrivateRoute exact={true} path='/recipes' component={RecipeList} />
                <PrivateRoute path='/recipes/:id' component={RecipeDetails} />

                <Route component={NotFound} />
            </Switch>
        );
    }
}