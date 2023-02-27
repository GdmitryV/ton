import React, {FC} from 'react';
import {ModalProps} from "@/shared/model/modal-window";
import {createPortal} from "react-dom";
import './modal-window.css';

const Modal:FC<ModalProps> = ({onClose, children}) => {
    return createPortal(
        <div className={'modalWrapper'} onClick={onClose}>
            <div className={'modal'} onClick={(event) => event.stopPropagation()}>
                <div className={'modalClose'} onClick={onClose}/>
                {children}
            </div>
        </div>, document.body
    );
};

export default Modal;