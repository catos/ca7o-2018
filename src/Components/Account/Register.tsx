import * as React from 'react';
import { RouteComponentProps, Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import { api } from '../../Common/ApiService';

interface IRegisterState extends IRegisterRequestDto {
    errorMessage: string;
    redirect: boolean;
}

interface IRegisterRequestDto {
    name: string;
    username: string;
    password: string;
    confirmPassword: string;
}

// interface IRegisterResponse {
//     token: string,
// }

export class Register extends React.Component<RouteComponentProps<{}>, IRegisterState> {
    constructor(props: any) {
        super(props);
        this.state = {
            errorMessage: '',
            redirect: false,

            name: '',
            username: '',
            password: '',
            confirmPassword: ''
        }
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
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input id="name" className="form-control" type="text" name="name" placeholder="lollerdk"
                                value={this.state.name}
                                onChange={(event) => this.setState({ name: event.target.value })} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input id="username" className="form-control" type="username" name="username" placeholder="user@name.here"
                                value={this.state.username}
                                onChange={(event) => this.setState({ username: event.target.value })} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input id="password" className="form-control" type="password" name="password"
                                value={this.state.password}
                                onChange={(event) => this.setState({ password: event.target.value })} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input id="confirmPassword" className="form-control" type="password" name="confirmPassword"
                                value={this.state.confirmPassword}
                                onChange={(event) => this.setState({ confirmPassword: event.target.value })} />
                        </div>
                        <div className="form-group text-center mt-4">
                            <button type="submit" className="btn btn-primary w-100">Register</button>
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

    private onSubmit = (event: any) => {
        event.preventDefault();
        this.register();
    }

    private register() {
        api.post('auth/register', this.state)
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

    // private async register() {
    //     try {
    //         const response = await api.post('auth/register', this.state);
    //         localStorage.setItem('token', response.token)
    //         this.setState({
    //             errorMessage: '',
    //             redirect: true
    //         });
    //     } catch (error) {
    //         console.log(error);
    //         this.setState({
    //             errorMessage: error.message
    //         })
    //     }
    // }

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