import React from 'react';

import { useInput } from '../../hooks/UseInput';

import './Register.scss';
import SimpleHeader from '../../components/Headers/SimpleHeader/SimpleHeader';
import Form from '../../components/Form/Form';
import Button from '../../components/Button/Button';


const Register = () => {
    const { firstNameBind } = useInput('');
    const { lastNameBind } = useInput('');
    const { emailBind } = useInput('');
    const { passwordBind } = useInput('');

    return (
        <div className="register">
            <SimpleHeader />
            <div className="form__container">
                {/* <svg width="255" height="232" viewBox="0 0 255 232" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 2H123.202H239.404C248.294 2 253 7.17172 253 15.5V92.2626C253 100.101 247.771 105 239.404 105H15.5958C7.22917 105 2 110 2 118V177C2 185 7.22917 190 15.5958 190M15.5958 190H239.404C242.019 190 243.588 191.5 243.588 194V226C243.588 228.5 242.333 230 239.404 230H15.5958C12.9813 230 11.4125 228.4 11.4125 226V194C11.4125 191.5 12.6675 190 15.5958 190Z" stroke="url(#paint0_linear)" strokeWidth="3"/>
                    <defs>
                        <linearGradient id="paint0_linear" x1="127.5" y1="8" x2="127.5" y2="230" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#FFD836"/>
                            <stop offset="1" stopColor="#FFE600"/>
                        </linearGradient>
                    </defs>
                </svg> */}
                <Form 
                    inputs={['text', 'text', 'email', 'password']} 
                    labels={['Nome', 'Sobrenome', 'Email', 'Senha']}
                    binds={[firstNameBind, lastNameBind, emailBind, passwordBind]}
                >
                    <Button backgroundColor="black" text="Registrar" />
                </Form> 
            </div>
        </div>
    )
};

export default Register;