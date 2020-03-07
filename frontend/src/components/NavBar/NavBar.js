import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { setUser, setToken } from '../../actions/auth'

import './NavBar.scss';

const mapStateToProps = state => {
    return {
        token: state.authReducer.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setToken: token => dispatch(setToken(token)),
        setUser: user => dispatch(setUser(user))
    };
};

const NavBar = props => {

    const handleLogOut = () => {
        props.setToken(null);
        props.setUser(null);
    };

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
                        <li 
                            onClick={handleLogOut}
                            className="nav__item"
                        >
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
                            <Link to="/register">
                                registrar
                            </Link>
                        </li>
                        <li className="nav__item">
                            <Link to="/login">
                                entrar
                                <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.4375 15.625H12.3203C12.0754 15.625 11.875 15.4246 11.875 15.1797V13.6953C11.875 13.4504 12.0754 13.25 12.3203 13.25H15.4375C16.0943 13.25 16.625 12.7193 16.625 12.0625V4.9375C16.625 4.28066 16.0943 3.75 15.4375 3.75H12.3203C12.0754 3.75 11.875 3.54961 11.875 3.30469V1.82031C11.875 1.57539 12.0754 1.375 12.3203 1.375H15.4375C17.4043 1.375 19 2.9707 19 4.9375V12.0625C19 14.0293 17.4043 15.625 15.4375 15.625ZM13.6934 8.16602L7.45898 1.93164C6.90234 1.375 5.9375 1.76465 5.9375 2.5625V6.125H0.890625C0.39707 6.125 0 6.52207 0 7.01563V10.5781C0 11.0717 0.39707 11.4688 0.890625 11.4688H5.9375V15.0313C5.9375 15.8291 6.90234 16.2188 7.45898 15.6621L13.6934 9.42774C14.0385 9.07891 14.0385 8.51484 13.6934 8.16602Z" fill="black"/>
                                </svg>
                            </Link>
                        </li>
                    </ul>
            }
        </nav>
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavBar);