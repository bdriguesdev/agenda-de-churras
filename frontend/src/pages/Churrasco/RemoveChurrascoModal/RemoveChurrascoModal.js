import React from 'react';
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

import { deleteChurrasco } from '../../../actions/churrasco';

import './RemoveChurrascoModal.scss';
import DecisionModal from '../../../components/Modals/DecisionModal/DecisionModal';

const mapStateToProps = state => {
    return {
        token: state.authReducer.token,
        loading: state.churrascoReducer.loading,
        churrasco: state.churrascoReducer.churrasco,
        errors: state.churrascoReducer.errors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        deleteChurrasco: (churrascoId, token) => dispatch(deleteChurrasco(churrascoId, token))
    }
};

const RemoveChurrascoModal = props => {
    const history = useHistory();

    const handleCloseModal = () => {
        const setIsModalOpen = props.bindModal[1];
        setIsModalOpen(false);
    };

    const handleDeleteChurrasco = () => {
        if(!props.loading) {
            props.deleteChurrasco(props.churrasco._id, props.token).then(() => {
                if(!props.errors) {
                    handleCloseModal();
                    history.push('/churrascos');
                }
            });
        }
    };

    return (
        <DecisionModal
            key="removeChurrascoModal"
            messageText="Você tem certeza que deseja excluir esse churrasco?"
            modalTitle="Excluir"
            acceptText="Sim"
            acceptedClick={handleDeleteChurrasco}
            rejectText="Não"
            rejectedClick={handleCloseModal}
            bindModal={props.bindModal}
        />
    )
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RemoveChurrascoModal);