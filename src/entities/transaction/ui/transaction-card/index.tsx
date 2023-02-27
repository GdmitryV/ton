import React, {FC, useState} from 'react';
import {TransactionProps} from "../../model";
import ModalWindow from "@/shared/ui/modal-window";
import TransactionForm from "@/entities/transaction/ui/transaction-form";
import './transaction-card.css';

export const TransactionCard:FC<TransactionProps> = ({transaction, render}) => {
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState('test');

    return (
        <>
            <div className={'transactionCard'} onClick={() => setShowModal(true)}>
                {render(transaction)}
            </div>

            {showModal && <ModalWindow onClose={() => setShowModal(false)}>
                <TransactionForm value={message} setValue={setMessage} key={transaction.hash}/>
            </ModalWindow>}
        </>
    );
};

