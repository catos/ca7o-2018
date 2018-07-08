import * as React from 'react';
import { Link } from 'react-router-dom';

import { IUser, UserTypes } from '../../Models/User';
import { api } from 'src/Common/ApiService';

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
        api.get('api/users')
            .then(response => {
                this.setState({
                    users: response as IUser[]
                })
            })
            .catch(error => console.log(error));
    }

    public render() {
        return (
            <div className="mt-3">
                <table className="table table-sm table-bordered">
                    <tbody>
                        <tr>
                            <th>Guid</th>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Type</th>
                        </tr>
                        {this.state.users.map((user, idx) =>
                            <tr key={idx}>
                                <td><Link to={`/users/${user.guid}`}>{user.guid}...</Link></td>
                                <td>{user.name}</td>
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