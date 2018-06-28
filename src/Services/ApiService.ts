import 'isomorphic-fetch';

import { auth } from './AuthService';

// const BASE_URL = 'http://localhost:8080/';
const BASE_URL = 'https://ca7o-server.herokuapp.com/';

export interface IApiError {
    field: string;
    message: string;
}

export interface IApiErrorResponse {
    code: number;
    errors: IApiError[];
}

class ApiService {

    public async get(endpoint: string) {
        const response = await fetch(BASE_URL + endpoint, this.getOptions());
        return await this.checkStatus(response);
    }

    public async post(endpoint: string, body: any) {
        const options = this.getOptions({
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        const response = await fetch(BASE_URL + endpoint, options) as Response;
        return await this.checkStatus(response);
    }

    private getOptions(options: RequestInit = {}): RequestInit {
        const token = localStorage.getItem('token');
        if (auth.isAuthenticated() && token !== null) {
            Object.assign(
                options, 
                options.headers = { 'Authorization': token }
            );
        }

        return options;
    }

    private async checkStatus(response: Response): Promise<any> {
        if (response.ok) {
            return Promise.resolve(response.json());
        } else {
            const error = await response.json();
            console.log(error);
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