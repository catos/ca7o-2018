import * as React from 'react';
import { Link } from 'react-router-dom';
import { Redirect, RouteComponentProps } from 'react-router-dom';

import { api } from '../../Common/ApiService';
import { auth } from '../../Common/AuthService';
import { Input, Button } from '../Shared/Form';

interface IState {
    errorMessage: string;
    password: string;
    redirect: boolean;
    redirectUrl: string;
    username: string;
}

export class Login extends React.Component<RouteComponentProps<{}>, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            errorMessage: '',
            username: '',
            password: '',
            redirect: auth.isAuthenticated(),
            redirectUrl: '',
        }

        this.onFieldValueChange = this.onFieldValueChange.bind(this);
    }

    public componentDidMount() {
        if (this.props.location.state !== undefined) {
            this.setState({
                redirectUrl: this.props.location.state.from
            })
        }
    }

    public render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirectUrl} />
        }

        const errorMessage = this.state.errorMessage.length
            ? <div className="alert alert-danger">{this.state.errorMessage}</div>
            : '';

        return (
            <div className="mt-2 row">
                <div className="col-md-6 offset-md-3">
                    <h2>Login</h2>
                    {errorMessage}
                    <form onSubmit={this.onSubmit} autoComplete="off">
                        <Input
                            name="username"
                            label="Username"
                            value={this.state.username}
                            onChange={this.onFieldValueChange} />
                        <Input
                            type="password" 
                            name="password"
                            label="Password"
                            value={this.state.password}
                            onChange={this.onFieldValueChange} />
                        <div className="form-group mt-4">
                            <Button className="btn btn-primary w-100" label="Login" onClick={this.onSubmit} />
                            <div className="mt-3 text-center">
                                Not registered ? <Link to={'/register'}>Register here</Link>
                            </div>
                        </div>

                        <div className="form-group text-danger text-center">
                            <a onClick={() => this.easyLogin('cskogholt@gmail.com', 'monzter1')}>cskogholt@gmail.com</a>
                            <span className="ml-2 mr-2">|</span>
                            <a onClick={() => this.easyLogin('test@gmail.com', 'test123')}>test@gmail.com</a>
                            <span className="ml-2 mr-2">|</span>
                            <a onClick={() => this.easyLogin('notfound@gmail.com', 'monzter1')}>notfound@gmail.com</a>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    private onFieldValueChange(fieldName: string, value: string) {
        const nextState = {
            ...this.state,
            [fieldName]: value
        };
        this.setState(nextState);
    }

    private onSubmit = () => {
        const username = this.state.username;
        const password = this.state.password;
        api.post('/auth/login', { username, password })
            .then(response => {
                localStorage.setItem('token', response)
                this.setState({ redirect: true });
            })
            .catch(error => {
                const errors = error.errors.length
                    ? error.errors.reduce((a: string, b: string) => a + ', ' + b)
                    : '';

                this.setState({
                    errorMessage: errors
                });
                console.log(errors);
            });
    }

    private easyLogin(username: string, password: string) {
        this.setState({
            password,
            username
        })
    }


}