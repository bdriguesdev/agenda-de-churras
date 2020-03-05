import React, {useLayoutEffect} from 'react';
import anime from 'animejs';

import './SimpleHeader.scss';
import NavBar from '../../NavBar/NavBar';

const SimpleHeader = () => {

    // useLayoutEffect(() => {
    //     const tl = anime.timeline();
    //     tl
    //     .add({
    //         targets: '.simple-header svg path',
    //         strokeDashoffset: [anime.setDashoffset, 0],
    //         easing: 'easeInOutSine',
    //         duration: 300,
    //         delay: function(el, i) { return i * 300 }
    //     }, 500);
    // }, []);

    return (
        <header className="simple-header">
            <NavBar />
            <h1 className="header__title">
                Agenda de churras
            </h1>
        </header>
    );
};

export default SimpleHeader;