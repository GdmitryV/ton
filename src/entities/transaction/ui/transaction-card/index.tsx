import React, {FC, useEffect, useLayoutEffect, useRef, useState} from 'react';
import './transaction-card.css';
import {TransactionProps} from "../../model";
import {createPortal} from "react-dom";
import Modal from "../../../../features/ui/modal-window";
import Input from "../../../../shared/ui/input";
import {useObserver} from "../../../../shared";
import sentIcon from 'images/icons/sent-icon.png';
import receivedIcon from 'images/icons/received-icon.png';

export const TransactionCard:FC<TransactionProps> = ({transaction, isLastTransaction, handleIncreaseLimit}) => {
    const transactionRef = useRef<HTMLDivElement | null>(null);
    const observerEntry = useObserver(transactionRef, {});
    const [showModal, setShowModal] = useState(false);

    const [typeMsg, setTypeMsg] = useState('');
    const [fromAddress, setFromAddress] = useState('');
    const [toAddress, setToAddress] = useState('');
    const [message, setMessage] = useState('empty');

    useLayoutEffect(() => {
        if (transaction.in_msg.source) {
            setMessage(localStorage.getItem(transaction.transaction_id.hash) || transaction.in_msg.message);
        } else if (transaction.out_msgs.length) {
            setMessage(localStorage.getItem(transaction.transaction_id.hash) || transaction.out_msgs[0].message);
        }
    }, []);

    useEffect(()=> {
        if (transaction.in_msg.source) {
            setTypeMsg('in');
            setFromAddress(transaction.in_msg.source);
            setToAddress(transaction.in_msg.destination);
        } else if (transaction.out_msgs.length) {
            setTypeMsg('out');
            setFromAddress(transaction.out_msgs[0].source);
            setToAddress(transaction.out_msgs[0].destination);
        }
    }, []);

    useEffect(() => {
        if (!observerEntry) return;

        if (isLastTransaction && observerEntry.isIntersecting) {
            console.log(transaction.transaction_id.hash);
            setTimeout(() => handleIncreaseLimit(), 1000);
        }
    }, [observerEntry, isLastTransaction]);

    const handleLocalStorage = () => {
        if (localStorage.getItem(transaction.transaction_id.hash) === message) {
            return;
        }
        localStorage.setItem(transaction.transaction_id.hash, message);
    }

    return (
        <>
            <div className={'transactionCard'} ref={transactionRef} onClick={() => setShowModal(true)}>
                <img src={typeMsg === 'in'? receivedIcon : sentIcon} className={'icon'} alt="icon"/>
                <div className={'content'}>
                    <div className={'baseInfo'}>
                        <p>{typeMsg === 'in'? 'Received' : 'Sent'}</p>
                        {typeMsg === 'in'? <p>{transaction.in_msg.value}</p> :
                            <p>{transaction.out_msgs[0]?.value || '-'}</p>
                        }
                    </div>
                    <div className={'fullInfo'}>
                        <div>
                            {typeMsg === 'in'? <p>From</p>:<>
                                <p>Fee</p>
                                <p>To</p>
                            </>}
                        </div>
                        <div>
                            {
                                typeMsg === 'in'? <p>from</p>:<>
                                    <p>fee</p>
                                    <p>to</p>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>

            {showModal && createPortal(<Modal onClose={() => setShowModal(false)}>
                <Input value={message} onChange={(e) => setMessage(e.target.value)}/>
                {<button onClick={handleLocalStorage}>Save</button>}
            </Modal>, document.body)}
        </>
    );
};

