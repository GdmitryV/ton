import React, {FC} from 'react';
import {TextareaProps} from "@/shared/model/textarea";
import './textarea.css';

const Textarea:FC<TextareaProps> = ({value, onChange}) => {
    return (
        <textarea className={'textarea'} value={value} onChange={onChange}/>
    );
};

export default Textarea;