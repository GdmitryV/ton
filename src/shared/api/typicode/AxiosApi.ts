import axios from 'axios';

export class AxiosApi {
    instance = axios.create({
        baseURL: import.meta.env.VITE_API_URL,
    })

    get(url: string, params: any) {
        return this.instance.get(url, {params: params}).then(res => res);
    }

    post(url: string, data: any) {
        return this.instance.post(url, data);
    }

}