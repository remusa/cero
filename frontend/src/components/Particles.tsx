import React from 'react'
import Particles from 'react-particles-js'

import './particles.scss'

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

const ParticlesStyles: React.FC = () => <Particles className='particles' params={particlesOptions} />

export default ParticlesStyles
