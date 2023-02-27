import {PreparedTransactionData, Transaction} from "@/shared";
import React from "react";

export type TransactionProps = {
    transaction: PreparedTransactionData;
    render: (transaction: PreparedTransactionData) => React.ReactNode | React.ReactNode[];
}



