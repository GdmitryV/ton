import React, {FC} from 'react';
import './input.css';
import {InputProps} from "../../model";

const Input:FC<InputProps> = ({value, onChange}) => {
    return (
        <input type="text" className={'input'} value={value} onChange={onChange}/>
    );
};

export default Input;