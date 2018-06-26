import 'isomorphic-fetch';

import { auth } from './AuthService';

const BASE_URL = 'http://localhost:8080/';
// const BASE_URL = 'https://ca7o-server.herokuapp.com/api/';

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
        const result = await this.checkStatus(response);
        return result;
    }

    public async post(endpoint: string, body: any) {
        const options = this.getOptions({
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        const response = await fetch(BASE_URL + endpoint, options) as Response;
        const result = await this.checkStatus(response);

        return result;
    }

    private getOptions(options: RequestInit = {}): RequestInit {
        if (auth.isAuthenticated()) {
            Object.assign(
                options, 
                options.headers = { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
            );
        }

        return options;
    }

    private async checkStatus(response: Response): Promise<any> {
        if (response.ok) {
            return Promise.resolve(response.json());
        } else {
            // const errorResponse = {
            //     code: response.status,
            //     errors: []
            // } as ApiErrorResponse;

            const error = await response.json();
            // Object.keys(json).forEach(key => 
            //     // console.log('key: ' + key + ', value: ', json[key])
            //     errorResponse.errors.push({
            //         field: key,
            //         message: json[key].join(', ')
            //     })
            // );
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