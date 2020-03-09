import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { TransitionGroup, Transition } from 'react-transition-group';
import anime from 'animejs';

import { getAllChurrascos, setChurrascos } from '../../actions/churrasco';

import './Churrascos.scss';
import Header from '../../components/Headers/Header/Header';
import ChurrascoCard from '../../components/ChurrascoCard/ChurrascoCard';
import Loader from '../../components/Loader/Loader';
import CreateModal from './CreateModal/CreateModal';
import CreateCard from './CreateCard/CreateCard';

const mapStateToProps = state => {
    return {
        loading: state.churrascoReducer.loading,
        churrascos: state.churrascoReducer.churrascos,
        token: state.authReducer.token
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getAllChurrascos: () => dispatch(getAllChurrascos()),
        setChurrascos: churrascos => dispatch(setChurrascos(churrascos))
    }
};

const Churrascos = props => {
    const [isChurrascosLoading, setIsChurrascosLoading] = useState(true);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const { setChurrascos, getAllChurrascos } = props;

    useEffect(() => {
        getAllChurrascos().then(() => {
            setIsChurrascosLoading(false);
        });

        return () => {
            setChurrascos(null);
        };
    }, [setChurrascos, getAllChurrascos]);

    const handleCardsEnterAnimation = (node, appearing) => {
        if(appearing) {
            anime({
                targets: '.churrasco__card__animation',
                translateY: [20, 0],
                opacity: [0, 1],
                duration: 500,
                delay: anime.stagger(100)
            });
        } else {
            anime({
                targets: node,
                translateY: [20, 0],
                opacity: [0, 1],
                duration: 1000,
                delay: 300
            });
        }
    };

    const handleOpenCreateModal = () => {
        setIsCreateModalOpen(true);
    };

    return (
        <div className="churrascos">
            <Header>
                <div className="churrascos__info">
                    <div className="info">
                        <h2 className="info__title">Churrascos</h2>
                        {
                            props.token &&
                            <svg onClick={handleOpenCreateModal} width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="11" cy="11" r="11" fill="white"/>
                                <path d="M5 11H11M17 11H11M11 11V5V17" stroke="#FFC700" strokeWidth="2"/>
                            </svg>
                        }
                    </div>
                </div>
            </Header>
            {
                !isChurrascosLoading && props.churrascos ?
                    <TransitionGroup className="churrascos__list">
                        {
                            props.churrascos.length > 0 ?
                                [
                                    props.churrascos.map(churrasco => {
                                        return (
                                            <Transition
                                                key={churrasco._id}
                                                onEnter={handleCardsEnterAnimation}
                                                timeout={500}
                                                appear
                                            >   
                                                <ChurrascoCard 
                                                    churrasco={churrasco} 
                                                />
                                            </Transition>
                                            
                                        )
                                    }),
                                    props.token &&
                                    <Transition
                                        key={'create__card'}
                                        timeout={500}
                                    >   
                                        <CreateCard handleOpenCreateModal={handleOpenCreateModal} />
                                    </Transition>
                                ]
                                :
                                props.token ?
                                    <Transition
                                        key={'create__card'}
                                        timeout={500}
                                    >   
                                        <CreateCard handleOpenCreateModal={handleOpenCreateModal} />
                                    </Transition>
                                    :
                                    <Transition
                                            key={'churras__empty'}
                                            timeout={500}
                                        >   
                                        <p className="churrascos__empty">Não há nenhum churras.</p>
                                    </Transition>
                        }
                    </TransitionGroup>
                    :
                    <Loader backgroundColor="black" />
            }

            <CreateModal 
                bindModal={[
                    isCreateModalOpen,
                    setIsCreateModalOpen
                ]}
            />
        </div>
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Churrascos);