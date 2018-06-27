import * as React from 'react';
import { Redirect } from 'react-router';
import { auth } from '../../Services/AuthService';

interface ILogoutState {
    redirect: boolean;
}

export class Logout extends React.Component<{}, ILogoutState> {

    constructor(props: any) {
        super(props);
        this.state = {
            redirect: false
        };
    }

    public render() {
        if (this.state.redirect) {
            return <Redirect to={'/'} />
        }
            
        return (
            <a href="#" className="nav-link" onClick={this.logout}>Logout</a>
        );
    }

    private logout = (event: any) => {
        event.preventDefault();
        auth.logout();
        this.setState({
            redirect: true
        });
    }
}