import React from 'react';

import './Loader.scss';

const Loader = props => {
    return (
        <div 
            className={props.backgroundColor? 'lds-ellipsis black': 'lds-ellipsis'} 
            style={{
                display: props.display
            }}
        >
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
};

export default Loader;