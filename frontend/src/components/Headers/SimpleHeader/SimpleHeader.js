import React, {useLayoutEffect} from 'react';
import anime from 'animejs';

import './SimpleHeader.scss';

const SimpleHeader = () => {

    useLayoutEffect(() => {
        const tl = anime.timeline();
        tl
        .add({
            targets: '.simple-header svg path',
            strokeDashoffset: [anime.setDashoffset, 0],
            easing: 'easeInOutSine',
            duration: 300,
            delay: function(el, i) { return i * 300 }
        }, 500);
    }, []);

    return (
        <header className="simple-header">
            <svg width="210" height="52" viewBox="0 0 210 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M27.9763 14.7199C21.8097 7.88655 13.6764 -4.18014 6.4764 12.2199C-0.723599 28.6199 9.4764 39.0532 15.4764 42.2199C21.4764 45.3865 36.3765 44.6199 33.9764 30.2199" stroke="black" strokeWidth="8" strokeLinecap="round"/>
                <path d="M41.9763 7.21988L43.9763 45.2199C43.9763 38.0532 45.6763 24.4199 52.4763 27.2199C59.2763 30.0199 60.9763 41.7199 60.9763 47.2199" stroke="black" strokeWidth="8" strokeLinecap="round"/>
                <path d="M69.2483 22.7177C68.3878 29.3821 69.0762 42.6109 78.7146 42.211C88.3529 41.8112 87.6071 24.717 86.0294 16.2199" stroke="black" strokeWidth="8" strokeLinecap="round"/>
                <path d="M99.9763 16.2199L99.9764 45.2199C99.9764 36.4738 103.576 19.7183 117.976 22.6643" stroke="black" strokeWidth="8" strokeLinecap="round"/>
                <path d="M125.976 16.2199L125.976 45.2199C125.976 36.4738 129.576 19.7183 143.976 22.6643" stroke="black" strokeWidth="8" strokeLinecap="round"/>
                <path d="M175.5 23L174.867 38.7249M174.5 45.5L174.867 38.7249M174.867 38.7249C175.347 31.2949 166.306 18.8024 155.477 24.8461C147.306 29.4065 153.306 49.7199 174.867 38.7249Z" stroke="black" strokeWidth="8" strokeLinecap="round"/>
                <path d="M204.402 25.9077C201.266 22.1015 194.052 15.8757 190.289 21.4218C186.525 26.968 194.209 31.0732 197.737 32.4326C205.447 34.4716 212.243 40.1809 196.169 42.2199C189.897 42.2199 188.799 40.6702 185.976 36.1028" stroke="black" strokeWidth="8" strokeLinecap="round"/>
            </svg>
        </header>
    );
};

export default SimpleHeader;