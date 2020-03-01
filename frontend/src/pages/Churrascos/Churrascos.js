import React from 'react';

import './Churrascos.scss';
import Header from '../../components/Headers/Header/Header';
import ChurrascoCard from '../../components/ChurrascoCard/ChurrascoCard';

const Churrascos = () => {
    return (
        <div className="churrascos">
            <Header>
                <div className="churrascos__info">
                    <div className="info">
                        <h2 className="info__title">Churrascos</h2>
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="11" cy="11" r="11" fill="white"/>
                            <path d="M5 11H11M17 11H11M11 11V5V17" stroke="#FFC700" stroke-width="2"/>
                        </svg>
                    </div>
                </div>
            </Header>
            <div className="churrascos__list">
                <ChurrascoCard />
            </div>
        </div>
    );
};

export default Churrascos;