import 'isomorphic-fetch';
import * as React from "react";

import { Chat } from './Chat';
import { Painter } from './Painter';

interface IWesketchState {
    test: string;
}

export class Wesketch extends React.Component<{}, IWesketchState> {

    constructor(props: any, state: IWesketchState) {
        super(props, state);

        this.state = {
            test: 'ctor'
        };
    }

    public render() {
        return (
            <div>
                <h1>Wesketch!</h1>
                <p>test: {this.state.test}</p>

                <Chat />
                <Painter /> 
            </div>
        );
    }
}