import * as React from "react";
import { SocketClientService } from "src/Common/SocketClientService";

interface IState {
    socketService: SocketClientService;
    // rooms || clients
}

export class MbgLobby extends React.Component<{}, IState> {
    constructor(props: any) {
        super(props);

        this.state = {
            socketService: new SocketClientService(`${AppConfig.serverUrl}/cac`),
        }
    }
}