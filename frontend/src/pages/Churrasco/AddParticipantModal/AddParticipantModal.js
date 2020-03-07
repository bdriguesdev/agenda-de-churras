import React from 'react';
import { connect } from 'react-redux';

import { addParticipant } from '../../../actions/churrasco';
import { useInput } from '../../../hooks/UseInput';

import FormModal from '../../../components/Modals/FormModal/FormModal';

const mapStateToProps = state => {
    return {
        loading: state.churrascoReducer.loading,
        churrasco: state.churrascoReducer.churrasco,
        token: state.authReducer.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addParticipant: (participantInfo, churrascoId, token) => dispatch(addParticipant(participantInfo, churrascoId, token))
    };
};

const AddParticipantModal = props => {
    const { bind:nameBind } = useInput('');
    const { bind:valueBind } = useInput(0);

    const handleAddParticipant = () => {
        if(!props.loading) {
            props.addParticipant(
                {
                    name: nameBind.value,
                    value: valueBind.value,
                },
                props.churrasco._id,
                props.token
            );
        }
    };

    return (
        <FormModal 
            bindModal={props.bindModal}

            className={'modal__container participant__add__modal'}
            inputs={['text', 'number']} 
            labels={['Nome', 'Valor']}
            binds={[nameBind, valueBind]}

            strokedashes={[['201 1166', '0'], ['201 1166', '-298']]}
            buttonStrokedashes={['476 1166', '-597']}
            pathTotalLength={1166}
            path=".churrasco .participant__add__modal .form__container"
            submit={handleAddParticipant}

            modalTitle="Participante"

            buttonText="Adicionar"
            buttonLoading={props.loading}
        >
            <svg className="form__animation" width="268" height="305" viewBox="0 0 268 305" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M34.01 58H237.26C238.244 58 239.188 58.3909 239.883 59.0866C240.579 59.7824 240.97 60.726 240.97 61.71V142.29C240.97 143.274 240.579 144.218 239.883 144.913C239.188 145.609 238.244 146 237.26 146H30.71C29.726 146 28.7824 146.391 28.0866 147.087C27.3909 147.782 27 148.726 27 149.71V225.81C27.0053 226.79 27.3985 227.729 28.0937 228.42C28.7889 229.112 29.7295 229.5 30.71 229.5H229.88C230.367 229.5 230.85 229.596 231.3 229.782C231.75 229.969 232.159 230.242 232.503 230.587C232.848 230.931 233.121 231.34 233.308 231.79C233.494 232.24 233.59 232.723 233.59 233.21V266.83C233.59 267.317 233.494 267.8 233.308 268.25C233.121 268.7 232.848 269.109 232.503 269.453C232.159 269.798 231.75 270.071 231.3 270.258C230.85 270.444 230.367 270.54 229.88 270.54H38.31C37.326 270.54 36.3824 270.149 35.6866 269.453C34.9909 268.758 34.6 267.814 34.6 266.83V233.23C34.5974 232.741 34.6914 232.257 34.8766 231.804C35.0619 231.352 35.3348 230.94 35.6795 230.594C36.0243 230.247 36.4342 229.972 36.8856 229.784C37.337 229.597 37.8211 229.5 38.31 229.5H133.98" stroke="#FFE600" strokeWidth="3" strokeMiterlimit="10"/>
            </svg>
        </FormModal>
    )
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddParticipantModal);