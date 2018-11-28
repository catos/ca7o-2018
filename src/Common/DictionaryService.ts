import axios, { AxiosRequestConfig } from 'axios';

class DictionaryService {
    private baseUrl: string = 'https://od-api.oxforddictionaries.com/api/v1';
    private sourceLang: string = 'en';

    // {
    //     "Accept": "application/json",
    //     "app_id": "bdba1785",
    //     "app_key": "d65a1a305f6f4989483e2d9939d6e907"
    // }

    public getInformation = async (word: string) => {
        const config: AxiosRequestConfig = {            
            url: '/user',
            method: 'get',
            headers: {
                "X-Accept": "application/json",
                "X-app_id": "bdba1785",
                "X-app_key": "d65a1a305f6f4989483e2d9939d6e907"
            }
        };
        console.log('config', config);

        const response = await axios.get(`${this.baseUrl}/entries/${this.sourceLang}/${word}`, config);
        console.log('getInformation', response);
    }
}

export const dictionary = new DictionaryService();