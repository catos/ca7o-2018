import 'isomorphic-fetch';
import * as React from "react";

interface IWesketchState {
    test: string;
}

// const API_URL = 'http://localhost:5000/api/';
const API_URL = 'https://ca7o-server.herokuapp.com/api/';

export class Wesketch extends React.Component<{}, IWesketchState> {

    constructor(props: any, state: IWesketchState) {
        super(props, state);

        this.state = {
            test: 'adsfasdf'
        };
    }

    public componentDidMount() {
        const config = {
            headers: { 'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhMjNmMzMwYWY4MGFkMDA0ZDRmZGMwNyIsIm5hbWUiOiJDYXRvIFNrb2dob2x0IiwidXNlcm5hbWUiOiJjc2tvZ2hvbHRAZ21haWwuY29tIiwiaWF0IjoxNTMwMDA4OTgyLCJleHAiOjE1MzA2MTM3ODJ9.Yq8WmQQweoZdbC7o9_9dTfZyoOhRpZxvrxcowDJQqzs' }
        };
        fetch(API_URL + 'users', config)
            .then(res => res.json())
            .then(users => {
                this.setState({
                    test: users.toString()
                })
            });        

    }

    public render() {
        return (
            <div>
                <h1>Wesketch!</h1>
                <p>test: {this.state.test}</p>
            </div>
        );
    }
}