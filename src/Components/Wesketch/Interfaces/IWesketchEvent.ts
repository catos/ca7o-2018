import { WesketchEventType } from "../Types/WesketchEventType";

export interface IWesketchEvent {
    clientId: string;
    userId: string;
    userName: string;
    timestamp: Date;
    type: WesketchEventType;
    value: any;
}