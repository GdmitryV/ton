import React, {FC, SetStateAction} from 'react';
import Textarea from "@/shared/ui/textarea";
import './transaction-form.css';

type Props = {
    value: string;
    setValue: (value: SetStateAction<string>) => void;
    handleSaveClick: () => void;
}

const TransactionForm:FC<Props> = ({value, setValue, handleSaveClick }) => {
    return (
        <div className={'transactionForm'}>
            <Textarea value={value} onChange={(e) => setValue(e.target.value)}/>
            <button onClick={handleSaveClick}>save</button>
        </div>
    );
};

export default TransactionForm;