import {Transaction} from "../../../shared";

export type TransactionProps = {
    transaction: Transaction;
    isLastTransaction: boolean;
    handleIncreaseLimit: () => void;
}



