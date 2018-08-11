import * as React from 'react';
import { RouteComponentProps, Redirect } from 'react-router';

import { api } from '../../Common/ApiService';
import { IUser } from '../../Models/User';
import { Form, FormGroup, Input, Label, FormFeedback, Button } from 'reactstrap';

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
            <div className="m-4">
                <h2>Edit details for: {user.name}</h2>
                <Form className="needs-validation was-validated" noValidate={true}>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text" name="name" id="name" placeholder="Name" />
                        <FormFeedback valid={false}>A name is required</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="username">Username</Label>
                        <Input type="email" name="username" id="username" placeholder="Username" />
                        <FormFeedback valid={false}>A username is required</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="password" name="password" id="password" placeholder="Password" />
                        <FormFeedback valid={false}>A password is required</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="type">Type</Label>
                        <Input type="text" name="type" id="type" placeholder="Type" />
                        <FormFeedback valid={false}>A type is required</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Button className="btn btn-primary" label="Save" onClick={this.onSave} />
                    </FormGroup>
                </Form>
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