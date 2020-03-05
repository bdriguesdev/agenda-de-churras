import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import { logIn } from '../../actions/auth';
import { useInput } from '../../hooks/UseInput';

import './Login.scss';
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
        logIn: userInfo => dispatch(logIn(userInfo))
    };
};

const Login = props => {
    const history = useHistory();

    const { bind:emailBind } = useInput('');
    const { bind:passwordBind } = useInput('');

    const handleRegisterClick = evt => {
        evt.preventDefault();
        history.push('/register/');
    };

    const handleLogIn = () => {
        if(!props.loading) {
            props.logIn({
                email: emailBind.value,
                password: passwordBind.value
            });
        }
    };

    return (
        <main className="login">
            <SimpleHeader />
            <div className="form__container">
                <svg className="form__animation" width="268" height="388" viewBox="0 0 268 388" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0)">
                        <path d="M33.52 57.5H236.22C237.374 57.5 238.48 57.9583 239.296 58.7741C240.112 59.5899 240.57 60.6963 240.57 61.85V141.09C240.571 141.662 240.46 142.229 240.242 142.758C240.024 143.287 239.704 143.767 239.299 144.172C238.895 144.577 238.415 144.899 237.887 145.118C237.359 145.337 236.792 145.45 236.22 145.45H30.85C29.6963 145.45 28.5899 145.908 27.7741 146.724C26.9583 147.54 26.5 148.646 26.5 149.8V224.74C26.5 225.894 26.9583 227 27.7741 227.816C28.5899 228.632 29.6963 229.09 30.85 229.09H229C230.155 229.093 231.261 229.553 232.077 230.371C232.892 231.188 233.35 232.295 233.35 233.45V265.45C233.35 266.604 232.892 267.71 232.076 268.526C231.26 269.342 230.154 269.8 229 269.8H38.72C38.1471 269.8 37.5798 269.687 37.0507 269.467C36.5216 269.247 36.0412 268.925 35.637 268.519C35.2328 268.113 34.9128 267.631 34.6954 267.101C34.4779 266.571 34.3674 266.003 34.37 265.43L34.53 233.38C34.5353 232.23 34.9959 231.128 35.8111 230.317C36.6263 229.506 37.7298 229.05 38.88 229.05H133.54" stroke="#FFD836" strokeWidth="3"/>
                    </g>
                    <defs>
                        <clipPath id="clip0">
                            <rect x="25" y="56" width="217.07" height="215.34" fill="white"/>
                        </clipPath>
                    </defs>
                </svg>
                <Form 
                    inputs={['email', 'password']} 
                    labels={['Email', 'Senha']}
                    binds={[emailBind, passwordBind]}
                    strokedashes={[['201 1183', '0'], ['201 1183', '-297']]}
                    buttonStrokedashes={['480 1183', '-606']}
                    path=".login .form__container"
                    submit={handleLogIn}
                >
                    <Button 
                        backgroundColor="#000000" 
                        text="Entrar" 
                        loading={props.loading} 
                    />
                    <div className="text--secondary"></div>
                    <Button 
                        backgroundColor="#000000" 
                        text="Registrar" 
                        click={handleRegisterClick}
                    />
                </Form> 
            </div>
        </main>
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);