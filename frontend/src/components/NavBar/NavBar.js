import React from 'react';

import './NavBar.scss';

const NavBar = () => {

    return (
        <nav className="navbar">
            <ul className="nav__list">
                <li className="nav__item">
                    churrascos
                </li>
                <li className="nav__item">
                    sair
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;