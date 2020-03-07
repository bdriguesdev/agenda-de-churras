import React from 'react';

import './Input.scss';

const Input = props => {

    const setPlaceholder = value => {
        if(value !== "") {
            return null;
        } else if(props.type === 'number') {
            return 0;
        } else {
            return props.placeholder.toLowerCase();
        }
    };

    return(
        <input 
            className="input" 
            type={props.type} 
            placeholder={setPlaceholder(props.bind.value)} 
            onFocus={() => props.inputPathAnimation(props.dasharray, props.dashoffset)}
            {...props.bind}
        />
    );
};

export default Input;