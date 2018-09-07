import * as React from "react";
import { Route, RouteProps, Redirect } from "react-router";

interface IProps extends RouteProps {
    isAuthorized: boolean;
}

export class ProtectedRoute extends Route<IProps> {
    public render() {
        if (!this.props.isAuthorized) {
            return <Redirect to={{
                pathname: '/login',
                state: { from: this.props.location }
            }} />;
        }

        return <Route {...this.props} />;
    }
}