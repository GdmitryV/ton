type TransactionId = {
    "@type": string;
    "lt": string;
    hash: string;
}

type msgData = {
    "@type": string;
    "body": string;
    "init_state": string;
}

type msg = {
    "@type": string;
    source: string;
    destination: string;
    value: string;
    fwd_fee: string;
    ihr_fee: string;
    created_lt: string;
    body_hash: string;
    msg_data: msgData;
    message: string;
}

type inMsg = msg;

type outMsgs = msg[];

export type Transaction = {
    "@type": string;
    utime: number;
    data: string;
    transaction_id: TransactionId;
    fee: string;
    storage_fee: string;
    other_fee: string;
    in_msg: inMsg;
    out_msgs: outMsgs;
}

export type Transactions = Transaction[];