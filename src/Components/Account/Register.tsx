import * as React from 'react';
import { RouteComponentProps, Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import { api } from '../../Common/ApiService';
import { Form, FormGroup, Input, Button, Label } from 'reactstrap';
import { ChangeEvent } from 'react';

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
            <div className="m-4 row">
                <div className="col-md-6 offset-md-3">
                    <h2 className="mb-4">Register</h2>
                    {error}
                    <Form onSubmit={this.onSubmit}>

                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input type="text" name="name" id="name" placeholder="Name"
                                value={this.state.name}
                                onChange={this.onFieldValueChange} />
                        </FormGroup>

                        <FormGroup>
                            <Label for="username">Username</Label>
                            <Input type="email" name="username" id="username" placeholder="Username"
                                value={this.state.username}
                                onChange={this.onFieldValueChange} />
                        </FormGroup>

                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input type="password" name="password" id="password" placeholder="password"
                                value={this.state.password}
                                onChange={this.onFieldValueChange} />
                        </FormGroup>

                        <FormGroup>
                            <Label for="confirmPassword">Confirm Password</Label>
                            <Input type="password" name="confirmPassword" id="confirmPassword" placeholder="confirmPassword"
                                value={this.state.confirmPassword}
                                onChange={this.onFieldValueChange} />
                        </FormGroup>

                        <FormGroup>
                            <Button className="btn btn-primary btn-lg w-100 mt-4" onClick={this.onSubmit}>
                                Register
                            </Button>
                        </FormGroup>

                        <FormGroup>
                            <div className="mt-4 text-center">Already registered ? <Link to={'/login'}>Login here</Link></div>
                        </FormGroup>

                        <FormGroup className="text-danger text-center opacity-15 opacity-hover">
                            <a onClick={() => this.easyRegister()}>Easy register</a>
                        </FormGroup>

                    </Form>
                </div>
            </div>
        );
    }

    private onFieldValueChange(event: ChangeEvent<HTMLInputElement>) {
        const nextState = {
            ...this.state,
            [event.target.name]: event.target.value
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
            })
            .catch(error => {
                const errors = error.errors.length
                    ? error.errors.reduce((a: string, b: string) => a + ', ' + b)
                    : '';

                this.setState({
                    errorMessage: errors
                });
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