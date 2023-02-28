import axios, {AxiosInstance} from 'axios';

class AxiosWrapper {
    private instance:AxiosInstance;

    constructor() {
        this.instance = axios.create({
            baseURL: import.meta.env.VITE_API_URL,
        })
    }

    get(url: string, params: any) {
        return this.instance.get(url, {params: params}).then(res => res);
    }

    post(url: string, data: any) {
        return this.instance.post(url, data);
    }
}

export const axiosInstance = new AxiosWrapper();