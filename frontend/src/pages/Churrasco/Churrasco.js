import React, { useEffect, useState } from 'react';
import { Transition } from 'react-transition-group';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import anime from 'animejs';

import { getChurrasco, setChurrasco } from '../../actions/churrasco'

import './Churrasco.scss';
import Header from '../../components/Headers/Header/Header';
import Loader from '../../components/Loader/Loader';
import Participants from './Participants/Participants';
import EditModal from './EditModal/EditModal';
import AddParticipantModal from './AddParticipantModal/AddParticipantModal';
import RemoveChurrascoModal from './RemoveChurrascoModal/RemoveChurrascoModal'

const mapStateToProps = state => {
    return {
        loading: state.churrascoReducer.loading,
        user: state.authReducer.user,
        token: state.authReducer.token,
        churrasco: state.churrascoReducer.churrasco
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getChurrasco: churrascoId => dispatch(getChurrasco(churrascoId)),
        setChurrasco: churrasco => dispatch(setChurrasco(churrasco))
    };
};

const Churrasco = props => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddParticipantModalOpen, setIsAddParticipantModalOpen] = useState(false);
    const [isRemoveChurrascoModalOpen, setIsRemoveChurrascoModalOpen] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        handleGetChurrasco()

        return () => {
            props.setChurrasco(null);
        };
    }, []);

    const handleChurrascoEnterAnimation = () => {
        console.log('here');
        anime({
            targets: '.churrasco',
            translateY: [20, 0],
            opacity: [0, 1],
            duration: 500,
            delay: anime.stagger(100)
        });
    };

    const convertDate = date => {
        const dateSplitted = date.split('T')[0].split('-');
        return `${dateSplitted[2]}/${dateSplitted[1]}`;
    };

    const totalMoneyRaised = participants => {
        let total = 0;
        participants.forEach(participant => {
            total += participant.value;
        });
        return total
    };

    const handleOpenEditModal = () => {
        setIsEditModalOpen(true);
    };

    const handleOpenRemoveParticipantModal = () => {
        setIsRemoveChurrascoModalOpen(true);
    };

    const handleOpenAddParticipantModal = () => {
        setIsAddParticipantModalOpen(true);
    };

    const handleGetChurrasco = () => {
        props.getChurrasco(id);
    };

    return (
        <div className="churrasco">
            <Header />
            {
                props.churrasco &&
                <Transition
                    onEnter={handleChurrascoEnterAnimation}
                    timeout={500}
                    appear
                >
                    <div className="churrasco__box">
                        <h3 className="churrasco__date">
                            { convertDate(props.churrasco.date) }
                            {
                                props.token && props.churrasco.creator === props.user._id &&
                                <svg onClick={handleOpenEditModal} className="churrasco__edit" width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0)">
                                        <path d="M11.175 9.43035L12.0639 8.55535C12.2028 8.41863 12.4444 8.51433 12.4444 8.71121V12.687C12.4444 13.4116 11.8472 13.9995 11.1111 13.9995H1.33333C0.597222 13.9995 0 13.4116 0 12.687V3.06199C0 2.33738 0.597222 1.74949 1.33333 1.74949H8.93056C9.12778 1.74949 9.22778 1.98464 9.08889 2.1241L8.2 2.9991C8.15833 3.04011 8.10278 3.06199 8.04167 3.06199H1.33333V12.687H11.1111V9.58347C11.1111 9.52605 11.1333 9.47136 11.175 9.43035ZM15.525 3.91238L8.23056 11.0928L5.71944 11.3663C4.99167 11.4456 4.37222 10.8413 4.45278 10.1194L4.73056 7.64753L12.025 0.467065C12.6611 -0.159106 13.6889 -0.159106 14.3222 0.467065L15.5222 1.64832C16.1583 2.27449 16.1583 3.28894 15.525 3.91238ZM12.7806 4.7573L11.1667 3.16863L6.00556 8.25183L5.80278 10.0374L7.61667 9.83777L12.7806 4.7573ZM14.5806 2.578L13.3806 1.39675C13.2667 1.28464 13.0806 1.28464 12.9694 1.39675L12.1111 2.24167L13.725 3.83035L14.5833 2.98542C14.6944 2.87058 14.6944 2.69011 14.5806 2.578Z" fill="#FFC700"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0">
                                            <rect width="16" height="14" fill="white"/>
                                        </clipPath>
                                    </defs>
                                </svg>
                            }
                            {
                                props.token && props.churrasco.creator === props.user._id &&
                                <svg onClick={handleOpenRemoveParticipantModal} className="churrasco__remove" width="21" height="24" viewBox="0 0 21 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip3)">
                                        <path d="M1.5 21.7499C1.5 22.3466 1.73705 22.9189 2.15901 23.3409C2.58097 23.7628 3.15326 23.9999 3.75 23.9999H17.25C17.8467 23.9999 18.419 23.7628 18.841 23.3409C19.2629 22.9189 19.5 22.3466 19.5 21.7499V5.99989H1.5V21.7499ZM14.25 9.74989C14.25 9.55097 14.329 9.36021 14.4697 9.21956C14.6103 9.0789 14.8011 8.99989 15 8.99989C15.1989 8.99989 15.3897 9.0789 15.5303 9.21956C15.671 9.36021 15.75 9.55097 15.75 9.74989V20.2499C15.75 20.4488 15.671 20.6396 15.5303 20.7802C15.3897 20.9209 15.1989 20.9999 15 20.9999C14.8011 20.9999 14.6103 20.9209 14.4697 20.7802C14.329 20.6396 14.25 20.4488 14.25 20.2499V9.74989ZM9.75 9.74989C9.75 9.55097 9.82902 9.36021 9.96967 9.21956C10.1103 9.0789 10.3011 8.99989 10.5 8.99989C10.6989 8.99989 10.8897 9.0789 11.0303 9.21956C11.171 9.36021 11.25 9.55097 11.25 9.74989V20.2499C11.25 20.4488 11.171 20.6396 11.0303 20.7802C10.8897 20.9209 10.6989 20.9999 10.5 20.9999C10.3011 20.9999 10.1103 20.9209 9.96967 20.7802C9.82902 20.6396 9.75 20.4488 9.75 20.2499V9.74989ZM5.25 9.74989C5.25 9.55097 5.32902 9.36021 5.46967 9.21956C5.61032 9.0789 5.80109 8.99989 6 8.99989C6.19891 8.99989 6.38968 9.0789 6.53033 9.21956C6.67098 9.36021 6.75 9.55097 6.75 9.74989V20.2499C6.75 20.4488 6.67098 20.6396 6.53033 20.7802C6.38968 20.9209 6.19891 20.9999 6 20.9999C5.80109 20.9999 5.61032 20.9209 5.46967 20.7802C5.32902 20.6396 5.25 20.4488 5.25 20.2499V9.74989ZM20.25 1.49989H14.625L14.1844 0.623324C14.091 0.435924 13.9473 0.278287 13.7692 0.168148C13.5912 0.0580085 13.3859 -0.000264006 13.1766 -0.000113852H7.81875C7.60987 -0.000916846 7.40498 0.0571383 7.22756 0.1674C7.05015 0.277662 6.90739 0.435671 6.81562 0.623324L6.375 1.49989H0.75C0.551088 1.49989 0.360322 1.5789 0.21967 1.71956C0.0790176 1.86021 0 2.05097 0 2.24989L0 3.74989C0 3.9488 0.0790176 4.13956 0.21967 4.28022C0.360322 4.42087 0.551088 4.49989 0.75 4.49989H20.25C20.4489 4.49989 20.6397 4.42087 20.7803 4.28022C20.921 4.13956 21 3.9488 21 3.74989V2.24989C21 2.05097 20.921 1.86021 20.7803 1.71956C20.6397 1.5789 20.4489 1.49989 20.25 1.49989Z" fill="#FFD836"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip3">
                                            <rect width="21" height="24" fill="white"/>
                                        </clipPath>
                                    </defs>
                                </svg>
                            }
                        </h3>
                        <h4 className="churrasco__title">{ props.churrasco.title }</h4>
                        <p className="churrasco__description">
                            { props.churrasco.description }
                        </p>
                        <div className="churrasco__prices">
                            <div className="churrasco__price">
                                {/* food + drink icon */}
                                <svg width="46" height="21" viewBox="0 0 46 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 11.5H25.5M31 11.5H25.5M25.5 11.5V6V17" stroke="#FFE600" strokeWidth="2"/>
                                    <path d="M43.0002 19.0312H41.3335V14.2246C44.1864 13.5729 46.2522 10.9471 45.9752 7.90166L45.3106 0.596777C45.2797 0.258809 44.996 0 44.656 0H35.3443C35.0047 0 34.7206 0.258809 34.6902 0.596777L34.0252 7.90207C33.7481 10.9475 35.8139 13.5733 38.6668 14.225V19.0312H37.0002C36.0797 19.0312 35.3335 19.7658 35.3335 20.6719C35.3335 20.8532 35.4827 21 35.6668 21H44.3335C44.5177 21 44.6668 20.8532 44.6668 20.6719C44.6668 19.7658 43.9206 19.0312 43.0002 19.0312ZM36.5731 1.96875H43.4272L43.726 5.25H36.2743L36.5731 1.96875Z" fill="#FFD836"/>
                                    <g clipPath="url(#clip1)">
                                        <path d="M8.49591 0.62313C8.52861 0.815903 9.15385 4.49911 9.15385 5.90594C9.15385 8.05106 8.01779 9.58094 6.33822 10.1962L6.86538 19.962C6.89399 20.5239 6.44856 20.9997 5.88462 20.9997H3.26923C2.70937 20.9997 2.25986 20.528 2.28846 19.962L2.81563 10.1962C1.13197 9.58094 0 8.04696 0 5.90594C0 4.49501 0.62524 0.815903 0.657933 0.62313C0.788702 -0.209487 2.50913 -0.221792 2.61538 0.668247V6.45965C2.66851 6.59911 3.23245 6.5909 3.26923 6.45965C3.32644 5.42196 3.59207 0.750278 3.59615 0.643638C3.73101 -0.209487 5.42284 -0.209487 5.55361 0.643638C5.56178 0.75438 5.82332 5.42196 5.88053 6.45965C5.91731 6.5909 6.48534 6.59911 6.53437 6.45965V0.668247C6.64062 -0.217691 8.36514 -0.209487 8.49591 0.62313V0.62313ZM13.3671 12.3413L12.7541 19.9333C12.705 20.5075 13.1587 20.9997 13.7308 20.9997H16.0192C16.5627 20.9997 17 20.5608 17 20.0153V0.984068C17 0.442661 16.5627 -0.000307589 16.0192 -0.000307589C12.6478 -0.000307589 6.97163 7.32098 13.3671 12.3413Z" fill="#FFD836"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip1">
                                            <rect width="17" height="21" fill="white"/>
                                        </clipPath>
                                    </defs>
                                </svg>
                                <span className="price">R${ props.churrasco.foodAndDrinkPrice }</span>
                            </div>
                            <div className="churrasco__price">
                                {/* food icon */}
                                <svg width="17" height="21" viewBox="0 0 17 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip2)">
                                        <path d="M8.49591 0.62313C8.52861 0.815903 9.15385 4.49911 9.15385 5.90594C9.15385 8.05106 8.01779 9.58094 6.33822 10.1962L6.86538 19.962C6.89399 20.5239 6.44856 20.9997 5.88462 20.9997H3.26923C2.70937 20.9997 2.25986 20.528 2.28846 19.962L2.81563 10.1962C1.13197 9.58094 0 8.04696 0 5.90594C0 4.49501 0.62524 0.815903 0.657933 0.62313C0.788702 -0.209487 2.50913 -0.221792 2.61538 0.668247V6.45965C2.66851 6.59911 3.23245 6.5909 3.26923 6.45965C3.32644 5.42196 3.59207 0.750278 3.59615 0.643638C3.73101 -0.209487 5.42284 -0.209487 5.55361 0.643638C5.56178 0.75438 5.82332 5.42196 5.88053 6.45965C5.91731 6.5909 6.48534 6.59911 6.53437 6.45965V0.668247C6.64062 -0.217691 8.36514 -0.209487 8.49591 0.62313V0.62313ZM13.3671 12.3413L12.7541 19.9333C12.705 20.5075 13.1587 20.9997 13.7308 20.9997H16.0192C16.5627 20.9997 17 20.5608 17 20.0153V0.984068C17 0.442661 16.5627 -0.000307589 16.0192 -0.000307589C12.6478 -0.000307589 6.97163 7.32098 13.3671 12.3413Z" fill="#FFD836"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip2">
                                            <rect width="17" height="21" fill="white"/>
                                        </clipPath>
                                    </defs>
                                </svg>
                                <span className="price">R${ props.churrasco.foodPrice }</span>
                            </div>
                        </div>
                        <div className="churrasco__info">
                            <div className="info__people">
                                <svg width="25" height="21" viewBox="0 0 25 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.9651 6.56244C11.9651 5.66831 11.6939 4.79426 11.1857 4.05081C10.6775 3.30737 9.95518 2.72792 9.11009 2.38575C8.265 2.04358 7.33509 1.95406 6.43795 2.12849C5.54081 2.30293 4.71674 2.7335 4.06993 3.36574C3.42313 3.99799 2.98265 4.80352 2.8042 5.68047C2.62575 6.55743 2.71734 7.46641 3.06738 8.29248C3.41743 9.11855 4.01021 9.82461 4.77077 10.3214C5.53133 10.8181 6.42551 11.0833 7.34022 11.0833C8.56682 11.0833 9.74318 10.607 10.6105 9.75914C11.4778 8.91132 11.9651 7.76144 11.9651 6.56244V6.56244ZM4.53545 6.56244C4.53548 6.01319 4.70251 5.47634 5.01532 5.02007C5.32813 4.5638 5.77261 4.2087 6.29231 3.99986C6.81201 3.79103 7.38347 3.73789 7.93413 3.84719C8.48479 3.95649 8.9898 4.22329 9.38501 4.61372C9.78022 5.00415 10.0478 5.50059 10.1538 6.03998C10.2598 6.57938 10.1994 7.13739 9.98024 7.64316C9.76111 8.14892 9.39315 8.57961 8.92309 8.88054C8.45304 9.18147 7.90209 9.33904 7.34022 9.33326C6.58844 9.33326 5.86744 9.04134 5.33585 8.52171C4.80426 8.00208 4.50561 7.29731 4.50561 6.56244H4.53545Z" fill="#FFD836"/>
                                    <path d="M18.2907 9.47914H16.4407C15.4006 9.47428 14.3751 9.71905 13.4542 10.192C12.5334 10.6649 11.7454 11.3516 11.1594 12.1916C10.2715 11.7518 9.29035 11.5221 8.29496 11.5208H6.41517C5.57272 11.5208 4.73851 11.683 3.96019 11.9981C3.18187 12.3133 2.47466 12.7752 1.87896 13.3575C0.675882 14.5335 0 16.1285 0 17.7916V18.6666C0 19.2854 0.251491 19.8789 0.699148 20.3165C1.1468 20.7541 1.75396 20.9999 2.38704 20.9999H12.2933C12.8779 21.0044 13.4439 20.799 13.8838 20.4227C14.3238 20.0463 14.6072 19.5253 14.6803 18.9583H22.3188C22.9519 18.9583 23.5591 18.7124 24.0067 18.2748C24.4544 17.8373 24.7059 17.2438 24.7059 16.6249V15.7499C24.7059 14.0868 24.03 12.4918 22.8269 11.3158C21.6238 10.1398 19.9921 9.47914 18.2907 9.47914V9.47914ZM12.89 18.6374C12.89 18.7921 12.8271 18.9405 12.7152 19.0499C12.6033 19.1593 12.4515 19.2208 12.2933 19.2208H2.38704C2.22877 19.2208 2.07698 19.1593 1.96507 19.0499C1.85315 18.9405 1.79028 18.7921 1.79028 18.6374V17.7916C1.79028 16.5926 2.27754 15.4427 3.14488 14.5949C4.01221 13.7471 5.18857 13.2708 6.41517 13.2708H8.29496C9.51638 13.2785 10.6851 13.7582 11.546 14.6052C12.4069 15.4522 12.89 16.5976 12.89 17.7916V18.6374ZM22.9156 16.6249C22.9156 16.7796 22.8527 16.928 22.7408 17.0374C22.6289 17.1468 22.4771 17.2083 22.3188 17.2083H14.6505C14.5079 15.6671 13.7848 14.2327 12.6215 13.1833C13.0432 12.5812 13.6087 12.0886 14.2689 11.7481C14.9292 11.4076 15.6644 11.2295 16.4109 11.2291H18.2907C19.5173 11.2291 20.6936 11.7054 21.561 12.5532C22.4283 13.4011 22.9156 14.5509 22.9156 15.7499V16.6249Z" fill="#FFD836"/>
                                    <path d="M21.9907 4.52082C21.9907 3.62668 21.7195 2.75263 21.2113 2.00919C20.7031 1.26574 19.9808 0.686298 19.1357 0.344128C18.2906 0.00195879 17.3607 -0.0875684 16.4636 0.0868682C15.5664 0.261305 14.7424 0.691871 14.0956 1.32412C13.4488 1.95636 13.0083 2.7619 12.8298 3.63885C12.6514 4.5158 12.743 5.42479 13.093 6.25086C13.4431 7.07693 14.0358 7.78298 14.7964 8.27974C15.557 8.77649 16.4511 9.04163 17.3659 9.04163C17.9732 9.04163 18.5746 8.9247 19.1357 8.6975C19.6968 8.47031 20.2067 8.13731 20.6361 7.71751C21.0656 7.29772 21.4063 6.79935 21.6387 6.25086C21.8711 5.70237 21.9907 5.1145 21.9907 4.52082V4.52082ZM14.5611 4.52082C14.5611 3.97156 14.7281 3.43471 15.041 2.97844C15.3538 2.52217 15.7982 2.16707 16.3179 1.95824C16.8376 1.74941 17.4091 1.69626 17.9598 1.80556C18.5104 1.91486 19.0154 2.18167 19.4106 2.5721C19.8059 2.96253 20.0734 3.45896 20.1794 3.99836C20.2854 4.53775 20.225 5.09576 20.0059 5.60153C19.7867 6.10729 19.4188 6.53799 18.9487 6.83891C18.4787 7.13984 17.9277 7.29742 17.3659 7.29164C16.6141 7.29164 15.8931 6.99971 15.3615 6.48008C14.8299 5.96045 14.5312 5.25568 14.5312 4.52082H14.5611Z" fill="#FFD836"/>
                                </svg>
                                <span className="people__amount">{ props.churrasco.participants.length }</span>
                                {
                                    props.token && props.churrasco.creator === props.user._id &&
                                    <svg onClick={handleOpenAddParticipantModal} className="people__add" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="11" cy="11" r="11" fill="rgb(255, 216, 54)"/>
                                        <path d="M5 11H11M17 11H11M11 11V5V17" stroke="white" strokeWidth="2"/>
                                    </svg>
                                }
                            </div>
                            <div className="info__money">
                                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.5 0C5.60753 0 0 5.60753 0 12.5C0 19.3925 5.60753 25 12.5 25C19.3925 25 25 19.3925 25 12.5C25 5.60753 19.3925 0 12.5 0ZM13.8361 18.8786V20.9922H11.166V19.0491C10.1747 18.9238 9.24639 18.5925 8.60211 18.1307L8.14849 17.8069L9.10512 15.1286L9.89066 15.6446C10.55 16.0777 11.4093 16.3364 12.1901 16.3364C13.0928 16.3364 13.7 15.8892 13.7 15.2229C13.7 14.763 13.497 14.2548 12.0244 13.6575C10.2548 12.9645 8.44368 11.9491 8.44368 9.68283C8.44368 7.9488 9.52711 6.56627 11.2795 6.0503V4.00874H13.9494V5.90301C14.7069 6.00693 15.3889 6.23584 16.0325 6.6006L16.5837 6.91325L15.5789 9.56355L14.8277 9.13343C14.4819 8.93615 13.8404 8.56928 12.8133 8.56928C11.6711 8.56928 11.5479 9.20271 11.5479 9.4747C11.5479 9.87862 11.6798 10.2 13.4425 10.9497C15.113 11.6304 16.8229 12.6539 16.8229 15.0717C16.8229 16.8729 15.6551 18.3557 13.8361 18.8786Z" fill="#FFD836"/>
                                </svg>
                                <span className="money__total">R${ totalMoneyRaised(props.churrasco.participants) }</span>
                            </div>
                        </div>

                        <Participants participants={props.churrasco.participants} />
                    </div>
                </Transition>
            }
            {
                props.loading && !props.churrasco &&
                <Loader backgroundColor="black" />
            }

            {
                props.churrasco&&
                [
                    <EditModal
                        key="editModal"
                        churrasco={props.churrasco}
                        bindModal={[
                            isEditModalOpen,
                            setIsEditModalOpen
                        ]}
                    />,
                    <AddParticipantModal
                        key="addParticipantModal"
                        churrasco={props.churrasco}
                        bindModal={[
                            isAddParticipantModalOpen,
                            setIsAddParticipantModalOpen
                        ]}
                    />,
                    <RemoveChurrascoModal
                        key="removeChurrascoModal"
                        bindModal={[
                            isRemoveChurrascoModalOpen,
                            setIsRemoveChurrascoModalOpen
                        ]}
                    />
                ]
            }
        </div>
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Churrasco);