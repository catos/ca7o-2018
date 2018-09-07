import * as React from 'react';
import { RouteProps, Route, Redirect } from 'react-router';

import { auth } from "../../Common/AuthService";

export const PrivateRoute: React.SFC<RouteProps> = ({ component, ...rest }: any) => {
    const Component = component;
    return (
        <Route
            {...rest}
            render={                
                (props) => auth.isAuthenticated()
                    ? <Component {...props} />
                    : <Redirect to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }} />
            }
        />
    );
}