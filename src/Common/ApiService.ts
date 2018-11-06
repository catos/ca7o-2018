import 'isomorphic-fetch';

import { AppConfig } from '../AppConfig';
import { auth } from './AuthService';

export interface IApiError {
    field: string;
    message: string;
}

export interface IApiErrorResponse {
    code: number;
    errors: IApiError[];
}

class ApiService {

    public get = async(endpoint: string) => {
        const response = await fetch(AppConfig.serverUrl + endpoint, this.getOptions('GET'));
        return await this.checkStatus(response);
    }

    public post = async(endpoint: string, body: any) => {
        const options = this.getOptions('POST', body);
        const response = await fetch(AppConfig.serverUrl + endpoint, options) as Response;
        return await this.checkStatus(response);
    }

    public put = async(endpoint: string, body: any) => {
        const options = this.getOptions('PUT', body);
        const response = await fetch(AppConfig.serverUrl + endpoint, options) as Response;
        return await this.checkStatus(response);
    }

    public delete = async(endpoint: string) => {
        const options = this.getOptions('DELETE');
        const response = await fetch(AppConfig.serverUrl + endpoint, options) as Response;
        return await this.checkStatus(response);
    }

    // TODO: codereview needed!
    private getOptions(method: string, body?: any): RequestInit {
        const options = {
            method,
        } as RequestInit;

        if (body) {
            options.body = JSON.stringify(body)
        }

        const headers = {
            'Content-Type': 'application/json'
        }
        const token = localStorage.getItem('token');
        if (auth.isAuthenticated() && token !== null) {
            Object.assign(
                headers,
                { 'Authorization': token }
            );
        }

        options.headers = headers;
        return options;
    }

    private async checkStatus(response: Response): Promise<any> {
        if (response.ok) {
            return Promise.resolve(response.json());
        }
        else if (response.status === 403) {
            console.log('redirect to login!');
            const error = await response.json();
            return Promise.reject(error);
        }
        else {
            const error = await response.json();
            return Promise.reject(error);
        }
    }


    // post<T>(endpoint: string, body: any) {
    //     var options = {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(body)
    //     };
    //     return fetch(BASE_URL + endpoint, options)
    //         .then(response => this.checkStatus(response))
    //         .then(response => { return Promise.resolve(response.json() as Promise<T>); })
    //         .catch((error) => this.throwError(error));
    // }
    // get<T>(endpoint: string): Promise<T> {
    //     let config = {
    //         headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
    //     };
    //     return fetch(BASE_URL + endpoint, config)
    //         .then((response: Response) => {
    //             if (!response.ok) {
    //                 throw response;
    //             }
    //             return response.json() as Promise<T>;
    //         })
    //         .catch(error => {
    //             error.text().then((message: string) => console.log(message));
    //             return error as Promise<T>;
    //         });
    // }
    // private checkStatus(response: Response): Promise<Response> {
    //     if (response.status >= 200 && response.status < 300) {
    //         return Promise.resolve(response);
    //     } else {
    //         console.log('checkStatus:' + response.json())
    //         let error = new Error(response.statusText);
    //         throw error;
    //     }
    // }
    // private throwError(error: any) {
    //     // document.write("<p>Ops! something wrong! We are so embarrased..</p>");
    //     console.log(error);
    //     return Promise.reject(error);
    // }
}

export const api = new ApiService();