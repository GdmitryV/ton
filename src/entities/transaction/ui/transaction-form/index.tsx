import React, {FC, SetStateAction} from 'react';
import Textarea from "@/shared/ui/textarea";
import './transaction-form.css';
import {handlerLocalStorage} from "@/shared";

type Props = {
    value: string;
    setValue: (value: SetStateAction<string>) => void;
    key: string;
}

const TransactionForm:FC<Props> = ({value, setValue, key}) => {
    return (
        <div className={'transactionForm'}>
            <Textarea value={value} onChange={(e) => setValue(e.target.value)}/>
            <button onClick={() => handlerLocalStorage(key, value)}>ok</button>
        </div>
    );
};

export default TransactionForm;