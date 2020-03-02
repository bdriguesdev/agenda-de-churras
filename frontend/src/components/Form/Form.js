import React from 'react';
import anime from 'animejs';

import './Form.scss';
import Input from '../Input/Input';

const Form = props => {

    const inputPathAnimation = (dasharray, dashoffset) => {
        const button = document.querySelector(props.path + ' .button');
        const buttonColor = button.style.color === ''? "#FFFFFF": button.style.color;
        const buttonBgColor = button.style.backgroundColor;

        const tl = anime.timeline({ easing: 'easeOutQuart', duration: 700  });

        tl
        .add({
            targets: props.path + ' svg path',
            strokeDashoffset: {
                value: dashoffset
            },
                strokeDasharray: {
                value: dasharray
            }
        })
        .add({
            targets: button,
            backgroundColor: [buttonBgColor, '#000000'],
            color: [buttonColor, '#FFFFFF'],
            duration: 300,
            boxShadow: '0px 0px 0px'
        }, '-=500')
    };

    const handleSubmit = evt => {
        evt.preventDefault();

        const [dasharray, dashoffset] = props.buttonStrokedashes;

        const button = document.querySelector(props.path + ' button');
        const buttonColor = button.style.color === ''? "#FFFFFF": button.style.color;
        const buttonBgColor = button.style.backgroundColor;

        const tl = anime.timeline({ easing: 'easeOutQuart', duration: 700  });

        tl
        .add({
            targets: props.path + ' svg path',
            strokeDashoffset: {
                value: dashoffset
            },
                strokeDasharray: {
                value: dasharray
            }
        })
        .add({
            targets: button,
            backgroundColor: [buttonBgColor, 'rgba(255, 255, 255, .0)'],
            color: [buttonColor, '#FFD836'],
            duration: 300,
            boxShadow: '0 0 0'
        }, '-=600')
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            {
                props.inputs.map((type, index) => {
                    return([
                        <label 
                            className="form__label"
                            key={props.labels[index]+index} 
                        >
                            { props.labels[index] }
                        </label>,
                        <Input 
                            key={index} 
                            type={type} 
                            placeholder={props.labels[index]}
                            bind={props.binds[index]} 
                            inputPathAnimation={inputPathAnimation}
                            dasharray={props.strokedashes[index][0]}
                            dashoffset={props.strokedashes[index][1]}
                            path={props.path}
                        />
                    ]);
                })
            }
            {
                props.children
            }
        </form>
    );
};

export default Form;

