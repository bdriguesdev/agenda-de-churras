import React from 'react';

import './DecisionModal.scss';
import MiniButton from '../../Buttons/MiniButton/MiniButton'

const DecisionModal = props => {
    const [isModalOpen] = props.bindModal;

    return (
        <div 
            className={props.className? props.className: 'decision-modal__container'}
            style={{ display: isModalOpen? 'block': 'none' }}    
        >
            <div className="modal">
                <div className="modal__header">
                    <h2>{ props.modalTitle }</h2>
                </div>
                <div className="modal__body">
                    <p>{ props.messageText }</p>
                    <div className="body__buttons">
                        <MiniButton 
                            backgroundColor="rgb(255, 216, 54)" 
                            text={props.acceptText}
                            loading={props.buttonLoading} 
                            click={props.acceptedClick}
                        />
                        <MiniButton 
                            backgroundColor="rgb(255, 216, 54)" 
                            text={props.rejectText}
                            click={props.rejectedClick}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DecisionModal;