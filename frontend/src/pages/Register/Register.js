import React from 'react';
import { connect } from 'react-redux';

import { createUser } from '../../actions/auth';
import { useInput } from '../../hooks/UseInput';

import './Register.scss';
import SimpleHeader from '../../components/Headers/SimpleHeader/SimpleHeader';
import Form from '../../components/Form/Form';
import Button from '../../components/Button/Button';

const mapStateToProps = state => {
    return {
        loading: state.authReducer.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createUser: userInfo => dispatch(createUser(userInfo))
    };
};

const Register = props => {

    const { bind:firstNameBind } = useInput('');
    const { bind:lastNameBind } = useInput('');
    const { bind:emailBind } = useInput('');
    const { bind:passwordBind } = useInput('');

    const handleCreateUser = () => {
        if(!props.loading) {
            props.createUser({
                email: emailBind.value,
                firstName: firstNameBind.value,
                lastName: lastNameBind.value,
                password: passwordBind.value
            });
        }
    };

    return (
        <div className="register">
            <SimpleHeader />
            <div className="form__container">
                <svg className="form__animation" width="268" height="481" viewBox="0 0 268 481" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M34.02 58H236.16C237.462 58 238.711 58.5173 239.632 59.4381C240.553 60.3589 241.07 61.6078 241.07 62.91V141.03C241.071 141.676 240.945 142.315 240.699 142.912C240.453 143.509 240.092 144.051 239.635 144.508C239.179 144.965 238.638 145.328 238.041 145.575C237.445 145.823 236.806 145.95 236.16 145.95H31.91C30.6078 145.95 29.3589 146.467 28.4381 147.388C27.5173 148.309 27 149.558 27 150.86V228.19C27 229.492 27.5173 230.741 28.4381 231.662C29.3589 232.583 30.6078 233.1 31.91 233.1H236.16C236.806 233.1 237.445 233.227 238.041 233.475C238.638 233.722 239.179 234.085 239.635 234.542C240.092 234.999 240.453 235.541 240.699 236.138C240.945 236.735 241.071 237.374 241.07 238.02V316.37C241.07 317.672 240.553 318.921 239.632 319.842C238.711 320.763 237.462 321.28 236.16 321.28H31.91C30.6078 321.28 29.3589 321.797 28.4381 322.718C27.5173 323.639 27 324.888 27 326.19V400.42C27 401.065 27.127 401.703 27.3738 402.299C27.6205 402.895 27.9822 403.436 28.4381 403.892C28.894 404.348 29.4353 404.709 30.031 404.956C30.6267 405.203 31.2652 405.33 31.91 405.33H228.4C229.702 405.33 230.951 405.847 231.872 406.768C232.793 407.689 233.31 408.938 233.31 410.24V441.16C233.311 441.806 233.185 442.445 232.939 443.042C232.693 443.639 232.331 444.181 231.875 444.638C231.419 445.095 230.878 445.458 230.281 445.705C229.685 445.953 229.046 446.08 228.4 446.08H38.93C38.2844 446.08 37.6451 445.953 37.0487 445.705C36.4524 445.458 35.9106 445.095 35.4546 444.638C34.9985 444.181 34.637 443.639 34.3909 443.042C34.1447 442.445 34.0187 441.806 34.02 441.16V410.24C34.02 408.938 34.5373 407.689 35.4581 406.768C36.3789 405.847 37.6278 405.33 38.93 405.33H134.04" stroke="#FFD836" strokeWidth="3"/>
                </svg>
                <Form 
                    inputs={['text', 'text', 'email', 'password']} 
                    labels={['Nome', 'Sobrenome', 'Email', 'Senha']}
                    binds={[firstNameBind, lastNameBind, emailBind, passwordBind]}
                    strokedashes={[['201 1758', '0'], ['201 1758', '-297'], ['201 1758', '-594'], ['201 1758', '-892']]}
                    buttonStrokedashes={['475 1758', '-1195']}
                    path=".register .form__container"
                    submit={handleCreateUser}
                >
                    <Button 
                        backgroundColor="#000000" 
                        text="Registrar" 
                        loading={props.loading}
                    />
                </Form> 
            </div>
        </div>
    )
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register);