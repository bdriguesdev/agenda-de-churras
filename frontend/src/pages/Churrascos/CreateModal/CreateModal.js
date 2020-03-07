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
            className={'churrasco__add__modal'}
            modalTitle="Churrasco"

            inputs={['text', 'text', 'date', 'number', 'number']} 
            labels={['Título', 'Descrição', 'Data', 'Valor comida + bebida', 'Valor apenas comida']}
            binds={[titleBind, descriptionBind, dateBind, foodAndDrinkPriceBind, foodPriceBind]}

            strokedashes={[['201 2063', '0'], ['201 2063', '-297'], ['201 2063', '-597'], ['201 2063', '-895'], ['201 2063', '-1194'],]}
            buttonStrokedashes={['476 2063', '-1495']}
            pathTotalLength={2063}
            path=".churrascos .churrasco__add__modal .form__container"
            submit={handleCreateChurrasco}

            buttonText="Criar"
            buttonLoading={props.loading}
        >
            <svg className="form__animation" width="268" height="566" viewBox="0 0 268 566" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M33.93 58H237.3C238.271 58 239.202 58.3856 239.888 59.072C240.574 59.7584 240.96 60.6893 240.96 61.66V142.38C240.96 143.351 240.574 144.282 239.888 144.968C239.202 145.654 238.271 146.04 237.3 146.04H30.66C30.1794 146.04 29.7034 146.135 29.2594 146.319C28.8153 146.503 28.4119 146.772 28.072 147.112C27.7321 147.452 27.4625 147.855 27.2786 148.299C27.0947 148.743 27 149.219 27 149.7V230.35C27 231.321 27.3856 232.252 28.072 232.938C28.7584 233.624 29.6893 234.01 30.66 234.01H237.3C238.271 234.01 239.202 234.396 239.888 235.082C240.574 235.768 240.96 236.699 240.96 237.67V318.34C240.96 318.82 240.865 319.296 240.681 319.739C240.497 320.183 240.227 320.585 239.887 320.924C239.547 321.264 239.144 321.532 238.7 321.715C238.256 321.898 237.78 321.991 237.3 321.99H30.66C29.6893 321.99 28.7584 322.376 28.072 323.062C27.3856 323.748 27 324.679 27 325.65V406.35C27 407.321 27.3856 408.252 28.072 408.938C28.7584 409.624 29.6893 410.01 30.66 410.01H237.3C237.78 410.009 238.256 410.102 238.7 410.285C239.144 410.468 239.547 410.736 239.887 411.076C240.227 411.415 240.497 411.817 240.681 412.261C240.865 412.704 240.96 413.18 240.96 413.66V489.85C240.957 490.819 240.571 491.747 239.884 492.432C239.198 493.116 238.269 493.5 237.3 493.5H38.09C37.6098 493.499 37.1341 493.592 36.6901 493.775C36.2461 493.958 35.8426 494.226 35.5026 494.566C35.1626 494.905 34.8928 495.307 34.7088 495.751C34.5247 496.194 34.43 496.67 34.43 497.15V530.78C34.422 531.266 34.5108 531.748 34.6912 532.199C34.8716 532.65 35.1399 533.061 35.4805 533.407C35.8212 533.753 36.2274 534.028 36.6754 534.216C37.1234 534.403 37.6043 534.5 38.09 534.5H229.86C230.341 534.5 230.817 534.405 231.261 534.221C231.705 534.037 232.108 533.768 232.448 533.428C232.788 533.088 233.057 532.685 233.241 532.241C233.425 531.797 233.52 531.321 233.52 530.84V497.16C233.52 496.68 233.425 496.204 233.241 495.761C233.057 495.317 232.787 494.915 232.447 494.576C232.107 494.236 231.704 493.968 231.26 493.785C230.816 493.602 230.34 493.509 229.86 493.51H133.98" stroke="#FFD836" strokeWidth="3" strokeMiterlimit="10"/>
            </svg>
        </FormModal>
    )
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateModal);