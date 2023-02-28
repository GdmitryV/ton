import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';

interface IAxios {
    get<T, R> (url: string, payload?: T): Promise<R>;
    //post<T> (url: string, payload?: T): Promise<T>;
}


class AxiosWrapper implements IAxios{
    private instance:AxiosInstance;

    constructor() {
        this.instance = axios.create({
            baseURL: import.meta.env.VITE_API_URL,
        })
    }

    get<T, R>(url: string, payload: T):Promise<R> {
        return new Promise<R>((resolve, reject) => {
            const options: AxiosRequestConfig = {
                headers: {},
                params: payload
            }

            this.instance.get(url, {...options})
                .then(res => resolve(res.data as R))
                .catch(res => reject(res))

        });
    }
}

export const axiosInstance = new AxiosWrapper();