import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './NavBar.scss';

const mapStateToProps = state => {
    return {
        token: state.authReducer.token
    };
};

const NavBar = props => {

    return (
        <nav className="navbar">
            {
                props.token?
                    <ul className="nav__list">
                        <li className="nav__item">
                            <Link to="/churrascos">
                                churrascos
                            </Link>
                        </li>
                        <li className="nav__item">
                            sair
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.4727 9.59767L11.5664 15.5039C11.0391 16.0313 10.125 15.6621 10.125 14.9063V11.5313H5.34375C4.87617 11.5313 4.5 11.1551 4.5 10.6875V7.31251C4.5 6.84494 4.87617 6.46876 5.34375 6.46876H10.125V3.09377C10.125 2.34142 11.0355 1.96877 11.5664 2.49611L17.4727 8.40236C17.7996 8.73283 17.7996 9.2672 17.4727 9.59767ZM6.75 15.3281V13.9219C6.75 13.6899 6.56016 13.5 6.32812 13.5H3.375C2.75273 13.5 2.25 12.9973 2.25 12.375V5.62502C2.25 5.00275 2.75273 4.50002 3.375 4.50002H6.32812C6.56016 4.50002 6.75 4.31017 6.75 4.07814V2.67189C6.75 2.43986 6.56016 2.25002 6.32812 2.25002H3.375C1.51172 2.25002 0 3.76173 0 5.62502V12.375C0 14.2383 1.51172 15.75 3.375 15.75H6.32812C6.56016 15.75 6.75 15.5602 6.75 15.3281Z" fill="black"/>
                            </svg>
                        </li>
                    </ul>
                    :
                    <ul className="nav__list">
                        <li className="nav__item">
                            <Link to="/churrascos">
                                churrascos
                            </Link>
                        </li>
                        <li className="nav__item">
                            <Link to="/login">
                                entrar
                            </Link>
                        </li>
                        <li className="nav__item">
                            <Link to="/register">
                                registrar
                            </Link>
                        </li>
                    </ul>
            }
        </nav>
    );
};

export default connect(
    mapStateToProps
)(NavBar);