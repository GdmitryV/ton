import { AxiosPromise } from "axios";
import {Transactions} from "./models";
import {AxiosApi} from "./AxiosApi";

const BASE_URL = '/getTransactions';

export type GetTransactionsParams = {
    address: string;
    limit?: number;
    lt?: string;
    hash?: string;
    to_lt?: number;
    archival?: boolean;
}

export type GetTransactionsAnswer = {
    ok: boolean;
    result: Transactions;
    error: string;
    code: number;
}

export const getTransactions = (params: GetTransactionsParams):AxiosPromise<GetTransactionsAnswer> => {
    return new AxiosApi().get(BASE_URL, params);
}