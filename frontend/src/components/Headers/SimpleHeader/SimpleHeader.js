import React, { useLayoutEffect } from 'react';
import anime from 'animejs';

import './SimpleHeader.scss';
import NavBar from '../../NavBar/NavBar';
import ResponsiveNavBar from '../../ResponsiveNavBar/ResponsiveNavBar';

const SimpleHeader = () => {

    useLayoutEffect(() => {

        const tl = anime.timeline({ easing: "easeOutExpo" });
        tl
        .add({
            targets: '.simple-header .title__first',
            delay: 300,
            duration: 500,
            translateY: [-80, 0]
        })
        .add({
            targets: '.simple-header .title__second',
            duration: 500,
            translateY: [80, 0]
        }, 300)
    }, []);

    return (
        <header className="simple-header">
            <NavBar />
            <ResponsiveNavBar />
            <h1 className="header__title">
                <span className="title__first">Agenda d</span>
                <span className="title__second">e Churras</span>
            </h1>
        </header>
    );
};

export default SimpleHeader;