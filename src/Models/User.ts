export enum UserTypes {
    NotDefined = 0,
    Regular = 1,
    Admin =2
}

export interface IUser {
    guid: string;
    name: string;
    username: string;
    password: string;
    type: UserTypes;
}