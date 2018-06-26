import * as React from 'react';
import { Link } from 'react-router-dom';
import { Redirect, RouteComponentProps } from 'react-router-dom';

// import { mdkApi } from '../Services/MdkApi';
// import { mdkAuth } from '../Services/MdkAuth';

interface ILoginState {
    errorMessage: string;
    password: string;
    redirect: boolean;
    redirectUrl: string;
    username: string;
}

// interface LoginResponse {
//     token: string;
// }

export class Login extends React.Component<RouteComponentProps<{}>, ILoginState> {
    constructor(props: any) {
        super(props);
        this.state = {
            errorMessage: '',
            password: '',
            redirect: false, // TODO: mdkAuth.isAuthenticated(),
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
                            <a onClick={() => this.easyLogin('cskogholt@gmail.com', 'monzter1')}>cskogholt@gmail.com</a>
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
        // this.login(this.state.username, this.state.password);
    }

    // async login(username: string, password: string) {
    //     const body = { username: username, password: password };

    //     try {
    //         const response = await mdkApi.post('auth/login', body) as LoginResponse;
    //         localStorage.setItem('token', response.token)
    //         this.setState({ redirect: true });
    //     } catch (error) {
    //         this.setState({
    //             errorMessage: error.message
    //         });
    //     }
    // }

    private easyLogin(username: string, password: string) {
        this.setState({
            password,
            username
        })
    }


}