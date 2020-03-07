import React, { useEffect } from 'react';

import './FormModal.scss';
import Form from '../../Form/Form';
import Button from '../../Buttons/Button/Button'

const FormModal = props => {
    const [isModalOpen, setIsModalOpen] = props.bindModal;

    useEffect(() => {
        const pathAnimation = document.querySelector(props.path + ' .form__animation path');
        pathAnimation.style.strokeDasharray = '0 ' + props.pathTotalLength;
        pathAnimation.style.strokeDashoffset = '0';
    }, []);

    useEffect(() => {
        if(isModalOpen) {
            let formContainer = document.querySelector(props.path);
            const modalContainer = formContainer.parentNode;
            const formContainerHeight = formContainer.getBoundingClientRect().height;
            const modalContainerHeight = modalContainer.getBoundingClientRect().height;

            if(modalContainerHeight < formContainerHeight + 25) {
                const paddingBottom = modalContainerHeight - formContainerHeight + 25;
                modalContainer.style.paddingBottom = paddingBottom + 'px';
            }
        }   
    }, [isModalOpen])

    const handleCloseModal = () => {
        setIsModalOpen(false);
        const pathAnimation = document.querySelector(props.path + ' .form__animation path');
        pathAnimation.style.strokeDasharray = '0 ' + props.pathTotalLength;
        pathAnimation.style.strokeDashoffset = '0';

        const button = document.querySelector(props.path + ' .button');
        button.style.backgroundColor = '#000000';
        button.style.color = "#FFFFFF";
    };

    return (
        <div 
            className={props.className? `${props.className} modal__container`: 'modal__container'}
            style={{ display: isModalOpen? 'block': 'none' }}    
        >
            <div className="form__container">
                <div className="form__header">
                    <h2>{ props.modalTitle }</h2>
                    <svg onClick={handleCloseModal} width="22" height="22" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 1L11 11M1 21L11 11M11 11L1 1L21 21" stroke="white" strokeWidth="2"/>
                    </svg>
                </div>
                {
                    props.children
                }
                <Form 
                    inputs={props.inputs} 
                    labels={props.labels}
                    binds={props.binds}
                    strokedashes={props.strokedashes}
                    buttonStrokedashes={props.buttonStrokedashes}
                    path={props.path}
                    submit={props.submit}
                >
                    <Button 
                        backgroundColor="#000000" 
                        text={props.buttonText}
                        loading={props.buttonLoading} 
                    />
                </Form> 
            </div>
        </div>
    );
};

export default FormModal