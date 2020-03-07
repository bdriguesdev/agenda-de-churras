import React, { useState, useEffect } from 'react';
import anime from 'animejs';
import { connect } from 'react-redux';

import { deleteMultipleParticipant } from '../../../actions/churrasco';

import './Participants.scss';
import Button from '../../../components/Buttons/Button/Button';

const mapStateToProps = state => {
    return {
        user: state.authReducer.user,
        loading: state.churrascoReducer.loading,
        churrasco: state.churrascoReducer.churrasco,
        token: state.authReducer.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        deleteMultipleParticipant: (participantsIds, churrascoId, token) => dispatch(deleteMultipleParticipant(participantsIds, churrascoId, token))
    }
};

const Participants = props => {
    const [selectedPersons, setSelectedPersons] = useState([]);
    const [isDeleteInProgress, setIsDeleteInProgress] = useState(false);
    const [isButtonDeactivated, setIsButtonDeactivated] = useState(true);
    const [isAuthorizedToEdit, setIsAuthorizedToEdit] = useState(false);

    useEffect(() => {
        if(props.user) {
            setIsAuthorizedToEdit(props.user._id === props.churrasco.creator);
        }
    }, []);

    useEffect(() => {
        if(selectedPersons.length > 0) {
            setIsButtonDeactivated(false);
        } else {
            setIsButtonDeactivated(true);   
        }
    }, [selectedPersons]);

    const handleDeleteMultipleParticipant = () => {
        if(!props.isDeleteInProgress) {
            setIsDeleteInProgress(true);
            props.deleteMultipleParticipant(selectedPersons, props.churrasco._id, props.token)
            .then(() => { 
                setIsDeleteInProgress(false);
                if(selectedPersons.length > 0) {
                    setIsButtonDeactivated(false);
                }
            });
        }
    };

    const handleSelectPerson = id => {
        const personIndex = selectedPersons.indexOf(id);
        if(personIndex === -1) {
            setSelectedPersons(oldState => {
                return [
                    ...oldState,
                    id
                ];
            });
            anime({
                targets: `#person${id} .person__remove--effect`,
                scaleX: [0, 1],
                duration: 500
            });
        } else {
            setSelectedPersons(oldState => {
                return oldState.filter(stateId => {
                    return stateId !== id;
                });
            });
            anime({
                targets: `#person${id} .person__remove--effect`,
                scaleX: 0,
                duration: 500
            });
        }
    };

    return (
        <div className="churrasco__persons">
            {
                props.participants.map(participant => {
                    return (
                        <div onClick={isAuthorizedToEdit? () => handleSelectPerson(participant._id): null} key={participant._id} className="person">
                            <div className="name__container">
                                <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="3.5" cy="3.5" r="3.5" fill="#FFC700"/>
                                </svg>
                                <h3 id={`person${participant._id}`} className="person__name">
                                    <div className="person__remove--effect"></div>
                                    { participant.name }
                                </h3>
                            </div>
                            <h3 id={`person${participant._id}`} className="person__money">
                                <div className="person__remove--effect"></div>
                                R${ participant.value }
                            </h3>
                        </div>
                    )
                })
            }
            {
                isAuthorizedToEdit&&
                <Button 
                    backgroundColor="#000000" 
                    deactivated={isButtonDeactivated}
                    text="Excluir" 
                    loading={isDeleteInProgress}
                    click={handleDeleteMultipleParticipant}
                />
            }
        </div>
    )
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Participants);