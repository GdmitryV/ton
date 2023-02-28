import React, {FC, useState} from 'react';
import {TransactionProps} from "../../model";
import ModalWindow from "@/shared/ui/modal-window";
import TransactionForm from "@/entities/transaction/ui/transaction-form";
import './transaction-card.css';
import {localStorage} from "@/shared";

export const TransactionCard:FC<TransactionProps> = ({transaction, render}) => {
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState(transaction.message);

    const handleSaveClick = () => {
        if (localStorage.get<string>(transaction.hash) === transaction.message) return;

        localStorage.set(transaction.hash, message);
    }

    return (
        <>
            <div className={'transactionCard'} onClick={() => setShowModal(true)}>
                {render(transaction)}
            </div>

            {showModal && <ModalWindow onClose={() => setShowModal(false)}>
                <TransactionForm value={message} setValue={setMessage} handleSaveClick={handleSaveClick}/>
            </ModalWindow>}
        </>
    );
};

