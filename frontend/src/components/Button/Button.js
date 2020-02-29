import React from 'react';

import './Button.scss';

const Button = props => {
    return (
        <button className="button" styles={{ backgroundColor: props.backgroundColor }}>
            {
                props.text
            }
        </button>
    );
};

export default Button;