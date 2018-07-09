import * as React from 'react';
import { RouteComponentProps, Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import { api } from '../../Common/ApiService';
import { Input, Button } from '../Shared/Form';

interface IState {
    errorMessage: string;
    redirect: boolean;
    name: string;
    username: string;
    password: string;
    confirmPassword: string;
}

export class Register extends React.Component<RouteComponentProps<{}>, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            errorMessage: '',
            redirect: false,

            name: '',
            username: '',
            password: '',
            confirmPassword: ''
        };

        this.onFieldValueChange = this.onFieldValueChange.bind(this);
    }

    public render() {
        if (this.state.redirect) {
            return <Redirect to={'/'} />
        }

        const error = this.state.errorMessage.length
            ? <div className="alert alert-danger">{this.state.errorMessage}</div>
            : '';

        return (
            <div className="mt-2 row">
                <div className="col-md-6 offset-md-3">
                    <h2>Register</h2>
                    {error}
                    <form onSubmit={this.onSubmit} autoComplete="off">
                        <Input
                            name="name"
                            label="Name"
                            value={this.state.name}
                            onChange={this.onFieldValueChange} />
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
                        <Input
                            type="password"
                            name="confirmPassword"
                            label="Confirm Password"
                            value={this.state.confirmPassword}
                            onChange={this.onFieldValueChange} />
                        <div className="form-group text-center mt-4">
                            <Button className="btn btn-primary w-100" label="Register" onClick={this.onSubmit} />
                            <div className="mt-3">Already registered ? <Link to={'/login'}>Login here</Link></div>
                        </div>

                        <div className="form-group text-danger text-center text-small">
                            <a onClick={() => this.easyRegister()}>Easy register</a>
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
        api.post('/auth/register', this.state)
            .then(response => {
                localStorage.setItem('token', response)
                this.setState({
                    errorMessage: '',
                    redirect: true
                });
                console.log(response);
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

    private easyRegister = () => {
        const randomName = Math.random().toString(36).substring(7);
        this.setState({
            name: randomName,
            username: randomName + '@test.com',
            password: 'test123',
            confirmPassword: 'test123'
        });
    }

}