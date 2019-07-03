import React from 'react'
import Particles from 'react-particles-js'
import styled from 'styled-components'
import Main from './Main'

import screenshot from '../../static/images/cero.png'

const HomeStyles = styled.div`
    .particles {
        --color1: ${props => props.theme.colorGreenLight};
        --color2: ${props => props.theme.colorGreen};

        background: var(--color2); /* fallback for old browsers */
        background: -webkit-linear-gradient(
            to right,
            var(--color1),
            var(--color2)
        ); /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(
            to right,
            var(--color1),
            var(--color2)
        ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: -1;
    }
`

const particlesOptions = {
    particles: {
        number: {
            value: 200,
            density: {
                enable: false,
            },
        },
        size: {
            value: 5,
            random: true,
            anim: {
                speed: 4,
                size_min: 0.3,
            },
        },
        line_linked: {
            enable: false,
        },
        move: {
            random: true,
            speed: 1,
            direction: 'top',
            out_mode: 'out',
        },
    },
    interactivity: {
        events: {
            onhover: {
                enable: true,
                mode: 'bubble',
            },
            onclick: {
                enable: true,
                mode: 'repulse',
            },
        },
        modes: {
            bubble: {
                distance: 250,
                duration: 2,
                size: 0,
                opacity: 0,
            },
            repulse: {
                distance: 400,
                duration: 4,
            },
        },
    },
}

const ImageStyles = styled.div`
    .project-list__card {
        max-width: 600px;
        /* height: 350px; */
        overflow: hidden;
        display: block;
        text-align: center;
        margin-top: 20px;
        border-width: 0px 0px 0px 0px;
        border-color: rgba(188, 188, 188, 1);
        border-radius: 5;
        border-style: solid;
        box-shadow: 0px 5px 35px 0px rgba(50, 50, 93, 0.17);

        &:hover {
            border-style: solid;
            box-shadow: 0px 5px 35px 0px rgba(50, 50, 93, 0.17);
        }

        @media all and (max-width: 500px) {
            margin-top: 40px;
        }
    }

    .project-list__card__image {
        height: 50%;
        overflow: hidden;

        &__src {
            width: 100%;
            height: 100%;
            border-radius: 5px 5px 0 0;
            transition: all 1s ease;
        }
    }

    .project-list__card:hover .project-list__card__image__src {
        transform: scale(1.2);
        transition: all 0.5s ease;
        text-decoration: none;
    }
`

const Screenshot = () => (
    <ImageStyles>
        <div className='project-list__card'>
            <div className='project-list__card__image'>
                <img
                    src={screenshot}
                    title='cero'
                    alt='cero screenshot'
                    className='project-list__card__image__src'
                />
            </div>
        </div>
    </ImageStyles>
)

const Home = () => (
    <HomeStyles>
        <Particles className='particles' params={particlesOptions} />
        <Main>
            <h1>Cero</h1>
            <h2>Cero is a simple intermittent fasting tracker app</h2>
            <Screenshot />
        </Main>
    </HomeStyles>
)

export default Home
