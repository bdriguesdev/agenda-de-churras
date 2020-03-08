import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { setAuthErrors } from '../../../actions/auth';
import { setChurrascoErrors } from '../../../actions/churrasco';

import './ErrorModal.scss';

const mapStateToProps = state => {
    return {
        churrascoErrors: state.churrascoReducer.errors,
        authErrors: state.authReducer.errors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setChurrascoErrors: errors => dispatch(setChurrascoErrors(errors)),
        setAuthErrors: errors => dispatch(setAuthErrors(errors))
    };
};

const ErrorModal = props => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if(props.churrascoErrors || props.authErrors) {
            setIsModalOpen(true);
        }
    }, [props.churrascoErrors, props.authErrors])

    useEffect(() => {
        if(isModalOpen) {
            let modalBg = document.querySelector('.error-modal__container');
            const modal = document.querySelector('.error-modal__container .modal');
            const modalBgHeight = modalBg.getBoundingClientRect().height;
            const modalHeight = modal.getBoundingClientRect().height;

            if(modalBgHeight < modalHeight + 25) {
                const paddingBottom = modalBgHeight - modalHeight + 25;
                modalBg.style.paddingBottom = paddingBottom + 'px';
            }
        }   
    }, [isModalOpen])

    const handleCloseModal = () => {
        setIsModalOpen(false);
        if(props.churrascoErrors) props.setChurrascoErrors(null);
        else props.setAuthErrors(null);
    };

    return (
        <div 
            className={props.className? props.className: 'error-modal__container'}
            style={{ display: isModalOpen? 'block': 'none' }}    
        >
            <div className="modal">
                <div className="modal__header">
                    <h2>Erro</h2>
                    <svg onClick={handleCloseModal} width="22" height="22" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 1L11 11M1 21L11 11M11 11L1 1L21 21" stroke="white" strokeWidth="2"/>
                    </svg>
                </div>
                <div className="modal__body">
                    {
                        props.churrascoErrors && props.churrascoErrors.map((err, index) => {
                            return (
                                <p key={index} >{ err }</p>
                            )
                        })
                    }
                    {
                        props.authErrors && props.authErrors.map((err, index) => {
                            return (
                                <p key={index} >{ err }</p>
                            )
                        })
                    }
                    <div className="body__buttons">
                    </div>
                </div>
            </div>
        </div>
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ErrorModal);