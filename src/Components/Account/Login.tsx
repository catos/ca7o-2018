import * as React from 'react';
import { Link } from 'react-router-dom';
import { Redirect, RouteComponentProps } from 'react-router-dom';

import { api } from '../../Services/ApiService';
import { auth } from '../../Services/AuthService';

interface ILoginState {
    errorMessage: string;
    password: string;
    redirect: boolean;
    redirectUrl: string;
    username: string;
}

export class Login extends React.Component<RouteComponentProps<{}>, ILoginState> {
    constructor(props: any) {
        super(props);
        this.state = {
            errorMessage: '',
            password: '',
            redirect: auth.isAuthenticated(),
            redirectUrl: '',
            username: '',
        }
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
                        <div className="form-group mt-4">
                            <button type="submit" className="btn btn-primary w-100">Login</button>
                            <div className="mt-3 text-center">
                                Not registered ? <Link to={'/register'}>Register here</Link>
                            </div>
                        </div>

                        <div className="form-group text-danger text-center">
                        <a onClick={() => this.easyLogin('cskogholt@gmail.com', 'cato123')}>cskogholt@gmail.com</a>
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

    private onSubmit = (event: any) => {
        event.preventDefault();
        this.login(this.state.username, this.state.password);
    }

    private async login(username: string, password: string) {
        api.post('auth/login', { username, password })
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

        // const body = { username, password };

        // try {
        //     const response = await api.post('auth/login', body);

        //     localStorage.setItem('token', response.toString())
        //     this.setState({ redirect: true });

        // } catch (error) {
        //     const errors = '';
        //     if (error.errors.length) {
        //         error.errors.reduce((a: string, b: string) => a + ', ' + b);
        //     }
        //     this.setState({
        //         errorMessage: errors
        //     });
        // }
    }

    private easyLogin(username: string, password: string) {
        this.setState({
            password,
            username
        })
    }


}