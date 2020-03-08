import React, { useLayoutEffect, useEffect, useState } from 'react';
import anime from 'animejs';

import './Header.scss';
import NavBar from '../../NavBar/NavBar';
import ResponsiveNavBar from '../../ResponsiveNavBar/ResponsiveNavBar';

const Header = props => {
    
    useLayoutEffect(() => {

        const tl = anime.timeline({ easing: "easeOutExpo" });
        tl
        .add({
            targets: '.header .title__first',
            delay: 300,
            duration: 500,
            translateY: [-80, 0]
        })
        .add({
            targets: '.header .title__second',
            duration: 500,
            translateY: [80, 0]
        }, 300)
    }, []);

    return (    
        <header className="header" style={props.children? {}: { paddingBottom: '70px' }}>
            <NavBar />
            <ResponsiveNavBar />
            <h1 
                className="header__title"
                style={props.children? {}: { margin: '30px 0 0 0', paddingBottom: 0 }}
            >
                <span className="title__first">Agenda d</span>
                <span className="title__second">e Churras</span>
            </h1>
            {
                props.children
            }
        </header>
    );
};

export default Header;