import React, { useLayoutEffect } from 'react';
import anime from 'animejs';

import './Header.scss';
import NavBar from '../../NavBar/NavBar';
import ResponsiveNavBar from '../../ResponsiveNavBar/ResponsiveNavBar';

const Header = props => {
    
    useLayoutEffect(() => {

        anime({
            targets: '.header .header__title .title',
            delay: 300,
            duration: 500,
            translateY: [150, 0],
            easing: "easeOutExpo"
        })
    }, []);

    return (    
        <header className="header" style={props.children? {}: { paddingBottom: '70px' }}>
            <NavBar />
            <ResponsiveNavBar />
            <h1 
                className="header__title"
                style={props.children? {}: { margin: '30px 0 0 0', paddingBottom: 0 }}
            >
                <span className="title">Agenda de Churras</span>
            </h1>
            {
                props.children
            }
        </header>
    );
};

export default Header;