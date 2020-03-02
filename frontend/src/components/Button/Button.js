import React from 'react';

import './Button.scss';

const Button = props => {

    return (
        <button 
            className="button" 
            style={{ backgroundColor: props.backgroundColor }}
            onClick={props.clickFunction}
        >
            {
                props.text
            }
        </button>
    );
};

export default Button;