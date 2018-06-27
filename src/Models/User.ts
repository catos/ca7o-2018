export enum UserTypes {
    NotDefined = 0,
    Regular = 1,
    Admin =2
}

export interface IUser {
    _id: string;
    name: string;
    username: string;
    type: UserTypes;
}