import * as React from 'react';
import { RouteComponentProps, Redirect } from 'react-router';

import { api } from '../../../Common/ApiService';
import { IUser, UserTypes } from '../../../Models/User';
import { Form, FormGroup, Input, Label, FormFeedback, Button } from 'reactstrap';
import { ChangeEvent } from 'react';
import { Link } from 'react-router-dom';

interface IProps extends RouteComponentProps<any> { }

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

        const { user } = this.state;
        const optionKeys = Object.keys(UserTypes)
            .filter(p => typeof UserTypes[p as any] === "number");

        return (
            <div className="m-4">
                <h2>Edit details for: {user.name}</h2>
                <div className="lead">{user.guid}</div>
                <Link className="mb-4" to={'/users'}>Back to list</Link>
                <Form className="needs-validation was-validated" noValidate={true}>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text" name="name" id="name" placeholder="Name"
                            value={user.name}
                            onChange={this.onFieldValueChange} />
                        <FormFeedback valid={false}>A name is required</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="username">Username</Label>
                        <Input type="email" name="username" id="username" placeholder="Username"
                            value={user.username}
                            onChange={this.onFieldValueChange} />
                        <FormFeedback valid={false}>A username is required</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="password" name="password" id="password" placeholder="Password"
                            value={user.password}
                            onChange={this.onFieldValueChange} />
                        <FormFeedback valid={false}>A password is required</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="type">Type</Label>
                        <Input type="select" name="type" id="type" placeholder="Type"
                            value={user.type}
                            onChange={this.onFieldValueChange}>
                            {optionKeys.map((key, idx) =>
                                <option key={idx} value={UserTypes[key]}>{key}</option>
                            )}
                        </Input>
                        <FormFeedback valid={false}>A type is required</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Button className="btn btn-primary" label="Save" onClick={this.onSave}>
                            Save
                        </Button>
                    </FormGroup>
                </Form>
            </div>
        );
    }

    private onFieldValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        const nextState = {
            ...this.state,
            user: {
                ...this.state.user,
                [event.target.name]: event.target.value
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