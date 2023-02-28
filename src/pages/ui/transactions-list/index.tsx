import React, {useEffect, useRef, useState} from 'react';
import {PreparedTransactionData, TransactionId} from "@/shared";
import {TransactionCard} from "@/entities/transaction";
import {getTransactions} from "@/shared/api/typicode/transactions";
import sentIcon from '@/images/icons/sent-icon.png';
import receivedIcon from '@/images/icons/received-icon.png';
import './transactions-list.css';
import {prepareTransactionData} from "@/shared/lib/utils/prepareTransactionData";

const TransactionsList = () => {
    const [preparedTransaction, setPreparedTransaction] = useState<PreparedTransactionData[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const lastTransactionId = useRef<TransactionId>({} as TransactionId);
    const transactionsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        getTransactions({address: import.meta.env.VITE_TRANSACTION_ADDRESS}).then(res => {
            const transactions = res.data.result;
            setPreparedTransaction(prepareTransactionData(transactions));
            lastTransactionId.current = transactions[transactions.length - 1].transaction_id;
        });
    }, []);


    useEffect(() => {
        if (!transactionsRef.current?.lastChild) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsLoading(true);
                setTimeout(() => {//todo сделать debounce
                    getTransactions({
                        address: import.meta.env.VITE_TRANSACTION_ADDRESS,
                        lt: lastTransactionId.current.lt,
                        hash: lastTransactionId.current.hash
                    }).then(res => {
                        const transactions = res.data.result;
                        const prepareTransactions = prepareTransactionData(transactions);
                        lastTransactionId.current = transactions[transactions.length - 1].transaction_id;
                        setPreparedTransaction(prev => [...prev, ...prepareTransactions.slice(1, preparedTransaction.length)]);//todo костыль?
                        setIsLoading(false);
                    })
                }, 1000);
                observer.unobserve(entry.target);
            }
        }, {threshold: 0.9});

        observer.observe(transactionsRef.current.lastChild as Element);
    }, [transactionsRef, preparedTransaction]);

    //todo ерунда оч не нравится
    const transactionCardRender = (transaction: PreparedTransactionData) => {
            if (transaction.from_address !== import.meta.env.VITE_TRANSACTION_ADDRESS) {
                return (
                    <>
                        <img src={receivedIcon} className={'icon'} alt="received icon"/>
                        <div className={'info'}>
                            <div className={'row'}>
                                <p>Received</p>
                                <p className={'value'}>{transaction.amountFormatted} TON</p>

                            </div>
                            <div className={'row'}>
                                <p>From</p>
                                <p className={'source'}>{transaction.from_address.substring(0, 4)}<span className="dots">...</span>{transaction.from_address.substring(transaction.from_address.length - 4)}</p>
                            </div>
                        </div>
                    </>);
            } else {
                return (
                    <>
                        <img src={sentIcon} className={'icon'} alt="sent icon"/>
                        <div className={'info'}>
                            <div className={'row'}>
                                <p>Sent</p>
                                <p className={'value'}>{transaction.amountFormatted} TON</p>

                            </div>
                            <div className={'row'}>
                                <p>Fee</p>
                                <p className={'source'}>{transaction.feeFormatted}</p>
                            </div>
                            <div className={'row'}>
                                <p>To</p>
                                <p className={'source'}>{transaction.to_address.substring(0, 4)}<span className="dots">...</span>{transaction.to_address.substring(transaction.to_address.length - 4)}</p>
                            </div>
                        </div>
                    </>
                );
            }
    }

    return (
        <>
            <div className={'transactionsList'} ref={transactionsRef}>
                {preparedTransaction.map((transaction, index) => <TransactionCard
                    key={transaction.hash}
                    render={(transaction) => transactionCardRender(transaction)}
                    transaction={transaction}/>)
                }
                {/*{isLoading && <p style={{fontSize: '4rem'}}>Loading.....</p>}*/}
            </div>
        </>
    );
};

export default TransactionsList;
