import React from 'react';
import { connect } from 'react-redux';

import { createChurrasco } from '../../../actions/churrasco';
import { useInput } from '../../../hooks/UseInput';

import FormModal from '../../../components/Modals/FormModal/FormModal';

const mapStateToProps = state => {
    return {
        loading: state.churrascoReducer.loading,
        token: state.authReducer.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createChurrasco: (churrascoInfo, token) => dispatch(createChurrasco(churrascoInfo, token))
    };
};

const CreateModal = props => {
    const { bind:titleBind } = useInput('');
    const { bind:descriptionBind } = useInput('');
    const { bind:dateBind } = useInput('');
    const { bind:foodPriceBind } = useInput('');
    const { bind:foodAndDrinkPriceBind } = useInput('');

    const handleCreateChurrasco = () => {
        if(!props.loading) {
            props.createChurrasco(
                {
                    title: titleBind.value,
                    description: descriptionBind.value,
                    date: dateBind.value,
                    foodPrice: foodPriceBind.value,
                    foodAndDrinkPrice: foodAndDrinkPriceBind.value
                },
                props.token
            );
        }
    };

    return (
        <FormModal 
            bindModal={props.bindModal}

            inputs={['text', 'text', 'date', 'number', 'number']} 
            labels={['Título', 'Descrição', 'Data', 'Valor comida + bebida', 'Valor apenas comida']}
            binds={[titleBind, descriptionBind, dateBind, foodAndDrinkPriceBind, foodPriceBind]}

            strokedashes={[['201 1183', '0'], ['201 1183', '-297'], ['201 1183', '0'], ['201 1183', '0'], ['201 1183', '0'],]}
            buttonStrokedashes={['480 1183', '-606']}
            path=".churrascos .form__container"
            submit={handleCreateChurrasco}

            modalTitle="Churrasco"

            buttonText="Criar"
            buttonLoading={props.loading}
        />
    )
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateModal);