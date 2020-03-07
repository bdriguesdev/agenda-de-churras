import React from 'react';

import './MiniButton.scss';
import Loader from '../../Loader/Loader';

const MiniButton = props => {

    return (
        <button 
            className="mini-button" 
            style={{ 
                backgroundColor: props.backgroundColor, 
                color: props.deactivated? "rgba(255,255,255,0.7)": "#FFFFFF", 
                cursor: props.deactivated? "not-allowed": "pointer"
            }}
            onClick={props.click}
        >
                <Loader display={props.loading? 'inline-block': 'none'} />
            {
                !props.loading&&props.text
            }
        </button>
    );
};

export default MiniButton;