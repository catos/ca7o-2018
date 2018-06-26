export enum UserTypes {
    Regular = 1,
    Admin =2
}

export interface IUser {
    name: string;
    username: string;
    type: UserTypes;
}