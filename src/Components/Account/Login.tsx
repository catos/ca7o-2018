import * as React from 'react';
import { Link } from 'react-router-dom';
import { Redirect, RouteComponentProps } from 'react-router-dom';

import { api } from '../../Common/ApiService';
import { auth } from '../../Common/AuthService';
import { Button, Input, Form, FormGroup, Label, FormFeedback } from 'reactstrap';
import { ChangeEvent } from 'react';

interface IState {
    valid: boolean;
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
            valid: true,
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
        // const { valid } = this.state;

        if (this.state.redirect) {
            return <Redirect to={this.state.redirectUrl} />
        }

        return (
            <div className="m-4 row">
                <div className="col-md-6 offset-md-3">
                    <h2 className="mb-4">Login</h2>

                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Label for="username">Username</Label>
                            <Input type="email" name="username" id="username" placeholder="Username"
                                value={this.state.username}
                                invalid={!this.state.valid}
                                onChange={this.onFieldValueChange} />
                            <FormFeedback invalid={this.state.valid ? 'true' : 'false'}>Invald username or password</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input type="password" name="password" id="password" placeholder="Password"
                                value={this.state.password}
                                onChange={this.onFieldValueChange} 
                                onKeyPress={this.onKeyPress} />
                        </FormGroup>

                        <FormGroup>
                            <Button className="btn btn-primary btn-lg w-100 mt-4" onClick={this.onSubmit}>
                                Login
                            </Button>
                        </FormGroup>

                        <FormGroup>
                            <div className="mt-4 text-center">
                                Not registered ? <Link to={'/register'}>Register here</Link>
                            </div>
                        </FormGroup>

                        <FormGroup className="text-danger text-center opacity-15 opacity-hover">
                            <a onClick={() => this.easyLogin('cskogholt@gmail.com', 'monzter1')}>cskogholt@gmail.com</a>
                            <span className="ml-2 mr-2">|</span>
                            <a onClick={() => this.easyLogin('test@gmail.com', 'test123')}>test@gmail.com</a>
                            <span className="ml-2 mr-2">|</span>
                            <a onClick={() => this.easyLogin('notfound@gmail.com', 'monzter1')}>notfound@gmail.com</a>
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

    private onKeyPress = (event: React.KeyboardEvent) => {
        if (event.which === 13) {
            this.onSubmit();
        }        
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
                    valid: false,
                    errorMessage: errors
                });
            });
    }

    private easyLogin(username: string, password: string) {
        this.setState({
            username,
            password
        });
    }
}