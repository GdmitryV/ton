import { Routes } from 'react-router-dom';
import {Route} from "react-router";
import {lazy} from "react";

const TransactionList = lazy(() => import('./ui/transactions-list'));

export const Routing = () => {
    return (
        <Routes>
            <Route path={'/'} element={<TransactionList/>}/>
        </Routes>
    );
}