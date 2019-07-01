import React from 'react'
import Particles from 'react-particles-js'
import styled from 'styled-components'
import Main from './Main'

const particlesOptions = {
    particles: {
        number: {
            value: 50,
            density: {
                enable: true,
                value_area: 800,
            },
        },
    },
}

const Home = () => (
    <>
        <Particles className='particles' params={particlesOptions} />
        <Main>
            <h1>Cero</h1>
            <h2>Cero is a simple intermittent fasting tracker app</h2>
        </Main>
    </>
)

export default Home
