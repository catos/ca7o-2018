import * as React from "react";
import { Route, Switch } from "react-router-dom";

import { Home } from "./Home";
import { Login } from "../Account/Login";

import { UserList } from "../Admin/UserList";
import { RecipeList } from "../Admin/RecipeList";

import { Register } from "../Account/Register";
import { Wesketch } from "../Wesketch/Wesketch";
import { Mdk } from "../Mdk/Mdk";

import { NotFound } from './NotFound';

export class Routes extends React.Component {
    public render() {
        return (
            <Switch>
                <Route exact={true} path="/" component={Home} />
                <Route path="/login" component={Login} />

                <Route path="/users" component={UserList} />
                <Route path="/recipes" component={RecipeList} />

                <Route path="/register" component={Register} />
                <Route path="/mdk" component={Mdk} />
                <Route path="/wesketch" component={Wesketch} />

                <Route component={NotFound} />
            </Switch>
        );
    }
}