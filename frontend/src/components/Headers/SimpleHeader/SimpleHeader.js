import React, { useLayoutEffect } from 'react';
import anime from 'animejs';

import './SimpleHeader.scss';
import NavBar from '../../NavBar/NavBar';
import ResponsiveNavBar from '../../ResponsiveNavBar/ResponsiveNavBar';

const SimpleHeader = () => {

    useLayoutEffect(() => {

        anime({
            targets: '.simple-header .header__title .title',
            delay: 300,
            duration: 500,
            translateY: [150, 0],
            easing: "easeOutExpo"
        })
    }, []);

    return (
        <header className="simple-header">
            <NavBar />
            <ResponsiveNavBar />
            <h1 className="header__title">
                <span className="title">Agenda de Churras</span>
            </h1>
        </header>
    );
};

export default SimpleHeader;