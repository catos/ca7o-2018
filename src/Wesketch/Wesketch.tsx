import 'isomorphic-fetch';
import * as React from "react";

interface IWesketchState {
    test: string;
}

// const API_URL = 'http://localhost:5000/api/';
const API_URL = 'https://ca7o-server.herokuapp.com/api/';

export class Wesketch extends React.Component<{}, IWesketchState> {

    constructor() {
        super({}, {});
        
        this.state = {
            test: 'adsfasdf'
        };
    }

    public componentDidMount() {
       this.loadUsers();
    }

    public render() {
        return (
            <div>
                <h1>Wesketch!</h1>
                <p>test: {this.state.test}</p>
            </div>
        );
    }

    private async loadUsers() {
        const config = {
            headers: { 'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhMjNmMzMwYWY4MGFkMDA0ZDRmZGMwNyIsIm5hbWUiOiJDYXRvIFNrb2dob2x0IiwidXNlcm5hbWUiOiJjc2tvZ2hvbHRAZ21haWwuY29tIiwiaWF0IjoxNTMwMDA4OTgyLCJleHAiOjE1MzA2MTM3ODJ9.Yq8WmQQweoZdbC7o9_9dTfZyoOhRpZxvrxcowDJQqzs' }
        };
        const response = await fetch(API_URL + 'users', config);
        const json = await response.json();
        console.log(json);
        
        this.setState({
            test: json.toString()
        });
    }

}