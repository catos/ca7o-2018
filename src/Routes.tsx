import * as React from "react";
import { Route, Switch } from "react-router-dom";

import { Home } from "./Home/Home";
import { Login } from "./Account/Login";
import { NotFound } from './Home/NotFound';
import { Wesketch } from "./Wesketch/Wesketch";

export class Routes extends React.Component {
    public render() {
        return (
            <Switch>
                <Route exact={true} path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/wesketch" component={Wesketch} />                
                <Route component={NotFound} />
            </Switch>
        );
    }
}