import React, {useEffect, useState} from 'react';
import './transactions-list.css';
import {Transactions} from "../../../shared";
import {TransactionCard} from "../../../entities/transaction";
import {getTransactions} from "../../../shared/api/typicode/transactions";

const TransactionsList = () => {
    const [transactions, setTransactions] = useState<Transactions>([]);
    const [limit, setLimit] = useState(10);
    const [lastHash, setLastHash] = useState('');
    const increaseValue = 5;

    const handleIncreaseLimit = () => {
        setLimit(prev => prev + increaseValue);
    };

    useEffect(() => {
        getTransactions({address: 'EQD2NmD_lH5f5u1Kj3KfGyTvhZSX0Eg6qp2a5IQUKXxOG21n', limit}).then(res => setTransactions(res.data.result));
    },[limit]);

    return (
        <div className={'transactionsList'}>
            {transactions.map((transaction, index) => <TransactionCard
                handleIncreaseLimit={handleIncreaseLimit}
                isLastTransaction={transactions.length - 1 === index}
                key={transaction.transaction_id.hash}
                transaction={transaction}/>)
            }
        </div>
    );
};

export default TransactionsList;