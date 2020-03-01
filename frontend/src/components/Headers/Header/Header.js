import React, { useEffect } from 'react';

import './Header.scss';
import NavBar from '../../NavBar/NavBar';

const Header = props => {
    useEffect(() => {
        console.log(props.children)
    });
    
    return (    
        <header className="header">
            <NavBar />
            <h1 
                className="header__title"
                style={props.children? {}: { paddingBottom: '70px' }}
            >
                Agenda de churras
            </h1>
            {
                props.children
            }
        </header>
    );
};

export default Header;