import * as React from 'react';
import { Link } from 'react-router-dom';

import { IUser, UserTypes } from '../../Models/User';
import { api } from '../../Common/ApiService';

interface IState {
    users: IUser[]
}

export class UserList extends React.Component<{}, IState> {

    constructor(props: any) {
        super(props);
        this.state = {
            users: []
        };
    }

    public componentDidMount() {
        api.get('/api/users')
            .then(response => {
                this.setState({
                    users: response as IUser[]
                })
            })
            .catch(error => console.log(error));
    }

    public render() {
        return (
            <div className="m-4">
                <h2>Users</h2>
                <table className="table">
                    <thead className="dark">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.users.map((user, idx) =>
                            <tr key={idx}>
                                <td><strong title={user.guid}>{user.guid.substring(0, 4)}</strong></td>
                                <td><Link to={`/users/${user.guid}`}>{user.name}</Link></td>
                                <td>{user.username}</td>
                                <td>{UserTypes[user.type]}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }

}