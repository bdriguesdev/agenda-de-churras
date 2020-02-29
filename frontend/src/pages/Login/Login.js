import React from 'react';

import { useInput } from '../../hooks/UseInput';

import './Login.scss';
import Form from '../../components/Form/Form';
import Button from '../../components/Button/Button';

const Login = () => {
    const { emailBind } = useInput('');
    const { passwordBind } = useInput('');

    return (
        <main className="login">
            <h1 className="app__title">Agenda Churras</h1>
            <Form 
                inputs={['email', 'password']} 
                labels={['Email', 'Senha']}
                binds={[emailBind, passwordBind]}
            >
                <Button backgroundColor="black" text="Entrar" />
                <Button backgroundColor="black" text="Registrar" />
            </Form>
        </main>
    );
};

export default Login;