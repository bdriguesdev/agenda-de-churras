import React, { useEffect, useState } from 'react';
import {connect } from 'react-redux';

import { getAllChurrascos, setChurrascos } from '../../actions/churrasco';
import { grillMouseEnterAnimation, grillMouseLeaveAnimation } from './grillAnimation';

import './Churrascos.scss';
import Header from '../../components/Headers/Header/Header';
import ChurrascoCard from '../../components/ChurrascoCard/ChurrascoCard';
import Loader from '../../components/Loader/Loader';
import CreateModal from './CreateModal/CreateModal';

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
    const [grillAnimation, setGrillAnimation] = useState(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    useEffect(() => {
        handleGetAllChurrascos();

        window.addEventListener('resize', fixCreateCardHeight);
        fixCreateCardHeight();
        return () => {
            props.setChurrascos(null);
            window.removeEventListener('resize', fixCreateCardHeight);
        };
    }, []);

    useEffect(() => {

    });

    const handleGetAllChurrascos = () => {
        props.getAllChurrascos();
    };

    const handleGrillMouseEnterAnimation = () => {
        const tl = grillMouseEnterAnimation();

        setGrillAnimation(tl)
    };  

    const handleGrillMouseLeaveAnimation = () => {
        if(grillAnimation) grillAnimation.pause();
        grillMouseLeaveAnimation();
    };

    const fixCreateCardHeight = () => {
        const createCard = document.querySelector('.churrascos .create__card');
        const churrascoCard = document.querySelector('.churrascos .churrasco__card');

        if(churrascoCard) {
            const churrascoCardPaddingTop = window.getComputedStyle(churrascoCard, null).getPropertyValue('padding-top').split('p')[0];
            const churrascoCardPaddingBottom = window.getComputedStyle(churrascoCard, null).getPropertyValue('padding-bottom').split('p')[0];

            createCard.style.height = churrascoCard.getBoundingClientRect().height - churrascoCardPaddingTop - churrascoCardPaddingBottom + 'px';
            
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
                !props.loading?
                    <div className="churrascos__list">
                        {
                            !props.loading? 
                                props.churrascos &&
                                    props.churrascos.map(churrasco => {
                                        return (
                                            <ChurrascoCard 
                                                churrasco={churrasco} 
                                                key={churrasco._id}
                                            />
                                        )
                                    })
                                :
                                ""
                        }
                        <div 
                            onClick={handleOpenCreateModal}
                            onMouseEnter={handleGrillMouseEnterAnimation} 
                            onMouseLeave={handleGrillMouseLeaveAnimation} 
                            className="create__card"
                        >
                            <div className="card__icon__container">
                                <svg width="40" height="63" viewBox="0 0 40 63" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M26.3537 44.9586C26.4874 44.9586 26.6195 44.9301 26.7411 44.8751C29.7443 43.5244 33.3025 40.6043 33.4451 36.8206C33.4499 36.6976 33.4303 36.575 33.3874 36.4596C33.3445 36.3443 33.2791 36.2384 33.195 36.1482C33.111 36.058 33.0099 35.9851 32.8975 35.9338C32.7851 35.8824 32.6637 35.8536 32.5401 35.849C32.4165 35.8444 32.2932 35.864 32.1773 35.9068C32.0613 35.9496 31.955 36.0147 31.8644 36.0984C31.7737 36.1821 31.7006 36.2827 31.6491 36.3946C31.5976 36.5064 31.5687 36.6272 31.5642 36.7502C31.4608 39.4915 28.6777 41.9494 25.9654 43.1692C25.7693 43.2574 25.6096 43.4098 25.5127 43.601C25.4159 43.7922 25.3879 44.0106 25.4333 44.2198C25.4787 44.429 25.5948 44.6165 25.7623 44.7509C25.9298 44.8853 26.1385 44.9586 26.3537 44.9586H26.3537Z" fill="black" fillOpacity="0.4"/>
                                    <path d="M34.8235 52.7003C34.6233 52.7012 34.4233 52.7137 34.2245 52.7377L32.1446 46.025C34.1483 44.4976 35.7716 42.532 36.889 40.2805C38.0064 38.0289 38.5878 35.5517 38.5882 33.0407C38.5882 32.7924 38.4891 32.5543 38.3126 32.3788C38.136 32.2032 37.8967 32.1046 37.6471 32.1046H6.58823C6.33862 32.1046 6.09924 32.2032 5.92274 32.3788C5.74623 32.5543 5.64707 32.7924 5.64706 33.0407C5.64826 33.9822 5.73096 34.9219 5.89424 35.8492H0.941176C0.691561 35.8492 0.452169 35.9479 0.275664 36.1234C0.0991595 36.299 0 36.5371 0 36.7854C0 37.0337 0.0991595 37.2718 0.275664 37.4474C0.452169 37.6229 0.691561 37.7216 0.941176 37.7216H6.33571C7.36205 41.1231 9.46823 44.1025 12.339 46.214L8.49747 61.8396C8.46783 61.9591 8.46218 62.0833 8.48084 62.205C8.4995 62.3267 8.54211 62.4435 8.60623 62.5488C8.67034 62.6541 8.75471 62.7458 8.85449 62.8186C8.95427 62.8915 9.06752 62.944 9.18774 62.9732C9.30796 63.0025 9.4328 63.0079 9.55511 62.9891C9.67742 62.9702 9.7948 62.9276 9.90053 62.8636C10.0063 62.7997 10.0983 62.7156 10.1713 62.6162C10.2443 62.5168 10.2969 62.404 10.3261 62.2844L11.1863 58.7854H29.737C29.9161 59.747 30.367 60.638 31.0367 61.3539C31.7065 62.0699 32.5675 62.5813 33.5188 62.8282C34.4702 63.075 35.4726 63.0472 36.4086 62.748C37.3447 62.4487 38.1757 61.8904 38.8043 61.1384C39.4329 60.3864 39.8331 59.4718 39.958 58.5018C40.083 57.5317 39.9275 56.5463 39.5099 55.661C39.0922 54.7756 38.4296 54.027 37.5996 53.5026C36.7697 52.9783 35.8067 52.7 34.8235 52.7003V52.7003ZM7.55953 33.9769H36.6758C36.4365 37.6556 34.7987 41.1058 32.0948 43.627C29.3909 46.1481 25.8237 47.5511 22.1176 47.5511C18.4115 47.5511 14.8444 46.1481 12.1405 43.627C9.43662 41.1058 7.79877 37.6556 7.55953 33.9769V33.9769ZM14.0116 47.2936C16.5325 48.7176 19.3876 49.4523 22.2866 49.4228C25.1856 49.3934 28.025 48.601 30.5162 47.1261L32.4262 53.29C31.7318 53.6524 31.129 54.1668 30.6632 54.7943C30.1974 55.4218 29.8808 56.1462 29.737 56.9131H11.6466L14.0116 47.2936ZM34.8235 61.1258C34.172 61.1258 33.5351 60.9337 32.9934 60.5736C32.4517 60.2136 32.0295 59.7018 31.7802 59.1031C31.5308 58.5044 31.4656 57.8456 31.5927 57.21C31.7198 56.5744 32.0335 55.9906 32.4942 55.5323C32.9549 55.0741 33.5419 54.762 34.1809 54.6356C34.8199 54.5092 35.4822 54.5741 36.0841 54.822C36.686 55.07 37.2005 55.49 37.5625 56.0288C37.9244 56.5677 38.1176 57.2012 38.1176 57.8492C38.1167 58.7179 37.7693 59.5508 37.1517 60.1651C36.5342 60.7793 35.6969 61.1248 34.8235 61.1258V61.1258Z" fill="black" fillOpacity="0.4"/>
                                    <path id="grillOne" d="M29.8741 24.71C30.3454 26.1159 30.5177 27.106 29.9228 27.6979C29.8354 27.7848 29.766 27.888 29.7187 28.0016C29.6713 28.1152 29.647 28.2369 29.6469 28.3599C29.6469 28.4828 29.6713 28.6046 29.7186 28.7182C29.7658 28.8318 29.8352 28.935 29.9226 29.0219C30.01 29.1089 30.1138 29.1778 30.228 29.2249C30.3422 29.2719 30.4646 29.2961 30.5882 29.2961C30.7118 29.2961 30.8342 29.2719 30.9484 29.2248C31.0626 29.1777 31.1663 29.1087 31.2537 29.0217C32.7909 27.4927 32.0551 25.2974 31.6599 24.1183L31.423 23.4116C30.9683 22.0617 30.7107 21.1365 31.2537 20.5962C31.4294 20.4205 31.5279 20.1826 31.5275 19.9348C31.5272 19.687 31.4281 19.4494 31.2519 19.2742C31.0757 19.0989 30.8369 19.0003 30.5877 19C30.3386 18.9997 30.0994 19.0976 29.9228 19.2724C28.5147 20.6728 29.1643 22.5997 29.6383 24.0067L29.8741 24.71Z" fill="black" fillOpacity="0.4"/>
                                    <path id="grillTwo" d="M21.4034 24.71C21.8746 26.1159 22.047 27.106 21.4521 27.6979C21.3647 27.7848 21.2953 27.888 21.248 28.0016C21.2006 28.1152 21.1763 28.2369 21.1762 28.3599C21.1762 28.4828 21.2006 28.6046 21.2479 28.7182C21.2951 28.8318 21.3645 28.935 21.4519 29.0219C21.5393 29.1089 21.6431 29.1778 21.7573 29.2249C21.8715 29.2719 21.9939 29.2961 22.1175 29.2961C22.2411 29.2961 22.3635 29.2719 22.4777 29.2248C22.5918 29.1777 22.6956 29.1087 22.783 29.0217C24.3202 27.4927 23.5844 25.2974 23.1892 24.1183L22.9523 23.4116C22.4976 22.0617 22.24 21.1365 22.783 20.5962C22.9587 20.4205 23.0572 20.1826 23.0568 19.9348C23.0565 19.687 22.9574 19.4494 22.7812 19.2742C22.605 19.0989 22.3662 19.0003 22.117 19C21.8679 18.9997 21.6287 19.0976 21.4521 19.2724C20.044 20.6728 20.6936 22.5997 21.1676 24.0067L21.4034 24.71Z" fill="black" fillOpacity="0.4"/>
                                    <path id="grillOne" d="M12.8124 24.8826C13.2671 26.2324 13.5247 27.1576 12.9817 27.6979C12.8943 27.7848 12.8249 27.888 12.7776 28.0016C12.7303 28.1152 12.7059 28.2369 12.7059 28.3599C12.7058 28.4828 12.7302 28.6046 12.7775 28.7182C12.8248 28.8318 12.8941 28.935 12.9815 29.0219C13.0689 29.1089 13.1727 29.1778 13.2869 29.2249C13.4011 29.2719 13.5235 29.2961 13.6471 29.2961C13.7707 29.2961 13.8931 29.2718 14.0073 29.2248C14.1215 29.1777 14.2252 29.1087 14.3126 29.0217C15.7207 27.6214 15.0711 25.6944 14.5971 24.2874L14.3613 23.5841C13.89 22.1783 13.7177 21.1882 14.3126 20.5962C14.4883 20.4205 14.5868 20.1826 14.5864 19.9348C14.5861 19.687 14.487 19.4494 14.3108 19.2742C14.1346 19.0989 13.8958 19.0003 13.6466 19C13.3975 18.9997 13.1583 19.0976 12.9817 19.2724C11.4445 20.8014 12.1802 22.9967 12.5754 24.1759L12.8124 24.8826Z" fill="black" fillOpacity="0.4"/>
                                </svg>
                            </div>
                            <div className="card__title">Adicionar churras</div>
                        </div>
                    </div>
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