import React from 'react';

import './Form.scss';
import Input from '../Input/Input';

const Form = props => {

    return (
        <form onSubmit={props.submit} className="form">
            {
                props.inputs.map((type, index) => {
                    return([
                        <label 
                            className="form__label"
                            key={props.labels[index]+index} 
                        >
                            { props.labels[index] }
                        </label>,
                        <Input 
                            key={index} 
                            type={type} 
                            placeholder={props.labels[index]}
                            bind={props.binds[index]} 
                        />
                    ]);
                })
            }
            {
                props.children
            }
        </form>
    );
};

export default Form;

