import * as React from 'react';
import { RouteComponentProps, Redirect } from 'react-router';

import { api } from '../../Common/ApiService';
import { IUser } from '../../Models/User';
import { Button, Input } from '../Shared/Form';

interface IProps extends RouteComponentProps<any> {

}

interface IState {
    user: IUser;
    redirect: boolean;
}

export class UserDetails extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            user: {
                guid: '',
                name: '',
                username: '',
                password: '',
                type: -1
            },
            redirect: false
        }

        this.onFieldValueChange = this.onFieldValueChange.bind(this);
    }

    public componentDidMount() {
        api.get(`/api/users/${this.props.match.params.id}`)
            .then(result => {
                const user = result as IUser;
                user.password = '';
                this.setState({ user });
            })
            .catch(error => console.log(error));
    }

    public render() {
        if (this.state.redirect) {
            return <Redirect to={'/users'} />
        }

        const user = this.state.user;
        return (
            <div className="mt-3">
                <h1>Edit details for: {user.name}</h1>
                <form className="needs-validation was-validated" noValidate={true}>
                    <Input
                        name="name"
                        label="Name"
                        value={user.name}
                        onChange={this.onFieldValueChange}
                        required={true}
                        error="A name is required" />
                    <Input
                        name="username"
                        label="Username"
                        value={user.username}
                        onChange={this.onFieldValueChange}
                        required={true}
                        error="A username is required" />
                    <Input
                        name="password"
                        label="Password"
                        value={user.password} 
                        onChange={this.onFieldValueChange}
                        required={false} />
                    <Input
                        name="type"
                        label="Type"
                        value={user.type.toString()}
                        onChange={this.onFieldValueChange}
                        required={true}
                        error="Type is required" />

                    <Button className="btn btn-primary" label="Save" onClick={this.onSave} />
                </form>
            </div>
        );
    }

    private onFieldValueChange = (fieldName: string, value: string) => {
        const nextState = {
            ...this.state,
            user: {
                ...this.state.user,
                [fieldName]: value
            }
        };
        this.setState(nextState);
    }

    private onSave = () => {
        const user = this.state.user;
        const updatedUser = {
            name: user.name,
            username: user.username,
            password: user.password,
            type: user.type
        };

        api.put(`/api/users/${this.state.user.guid}`, updatedUser)
            .then(result => {
                this.setState({
                    redirect: true
                });
            })
            .catch(error => console.log(error));
    }

}