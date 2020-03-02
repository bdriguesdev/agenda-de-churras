import React from 'react';

import './Input.scss';

const Input = props => {

    return(
        <input 
            className="input" 
            type={props.type} 
            placeholder={props.placeholder.toLowerCase()} 
            onFocus={() => props.inputPathAnimation(props.dasharray, props.dashoffset)}
            {...props.bind}
        />
    );
};

export default Input;