import React, {FC} from 'react';
import './modal-window.css';
import {ModalProps} from "../../model";

const Modal:FC<ModalProps> = ({onClose, children}) => {
    return (
        <div className={'modalWrapper'} onClick={onClose}>
            <div className={'modal'} onClick={(event) => event.stopPropagation()}>
                <div className={'modalClose'} onClick={onClose}/>
                {children}
            </div>
        </div>
    );
};

export default Modal;