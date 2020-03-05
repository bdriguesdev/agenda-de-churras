import React from 'react';

import './Button.scss';
import Loader from '../Loader/Loader';

const Button = props => {

    return (
        <button 
            className="button" 
            style={{ backgroundColor: props.backgroundColor }}
            onClick={props.click}
        >
                <Loader display={props.loading? 'inline-block': 'none'} />
            {
                !props.loading&&props.text
            }
        </button>
    );
};

export default Button;