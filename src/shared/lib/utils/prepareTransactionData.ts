import BN from "bn.js";
import web3 from "web3";
import {hashToHex, PreparedTransactionData, Transactions} from "@/shared";

export const prepareTransactionData = (transactions: Transactions) => {
    const preparedData: PreparedTransactionData[] = [];

    for (const transaction of transactions) {
        let amount = new BN(transaction.in_msg.value);
        let from_address: string = '';
        let to_address: string = '';
        let message: string = '';

        for (const outMsg of transaction.out_msgs) {
            amount = amount.sub(new BN(outMsg.value));
        }

        if (transaction.in_msg.source) {
            from_address = transaction.in_msg.source;
            to_address = transaction.in_msg.destination;
            message = transaction.in_msg.message;
        } else if (transaction.out_msgs.length) {
            from_address = transaction.out_msgs[0].source;
            to_address = transaction.out_msgs[0].destination;
            message = transaction.out_msgs[0].message;
        }

        if (to_address) {
            preparedData.push({
                amountFormatted: web3.utils.fromWei(amount, 'gwei'),
                feeFormatted: web3.utils.fromWei(transaction.fee, 'gwei'),
                lt: transaction.transaction_id.lt,
                hash: hashToHex(transaction.transaction_id.hash),
                amount,
                from_address,
                to_address,
                fee: transaction.fee,
                storageFee: transaction.storage_fee,
                otherFee: transaction.other_fee,
                message,
                date: transaction.utime * 1000
            });
        }
    }

    return preparedData;
}