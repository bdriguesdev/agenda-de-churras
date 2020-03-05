import anime from 'animejs';

export const grillMouseEnterAnimation = () => {
    const tl = anime.timeline({ easing: 'easeInOutSine', loop: true });
    
    tl
    .add({
        targets: '.churrascos #grillOne',
        opacity: [
            {
                value: 0,
                duration: 1000
            },
            {
                value: 1,
                delay: 1,
                duration: 500
            }
        ],
        translateY: [
            {
                value: '-10px',
                duration: 1000
            },
            {
                value: '6px',
                duration: 1
            },
            {
                value: '0px',
                duration: 500
            }
        ]
    })
    .add({
        targets: '.churrascos #grillTwo',
        opacity: [
            {
                value: 0,
                duration: 1000
            },
            {
                value: 1,
                delay: 1,
                duration: 500
            }
        ],
        translateY: [
            {
                value: '-15px',
                duration: 1000
            },
            {
                value: '4px',
                duration: 1
            },
            {
                value: '0px',
                duration: 500
            }
        ]
    }, 0);

    return tl;
};

export const grillMouseLeaveAnimation = () => {
    const tl = anime.timeline({ easing: 'easeInOutSine' });

    tl
    .add({
        targets: '.churrascos #grillOne',
        opacity: 1,
        translateY: '0px',
        duration: 300
    })
    .add({
        targets: '.churrascos #grillTwo',
        opacity: 1,
        translateY: '0px',
        duration: 300
    }, 0)
};
