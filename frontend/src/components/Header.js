import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Particles from 'react-particles-js'

const particlesOptions = {
    particles: {
        number: {
            value: 100,
            density: {
                enable: true,
                value_area: 400,
            },
        },
    },
}

const HeaderStyles = styled.header`
    nav {
        background-color: var(--color-primary);
        width: 100%;
        height: 40px;
        text-align: center;
        display: flex;
        flex-flow: row wrap;
        justify-content: flex-end;
        align-content: center;
    }

    a {
        padding: 8px;
        margin: 8px;
        flex: 0 1 20px;
        color: #fff;
    }

    @media all and (max-width: 800px) {
        nav {
            /* justify-content: flex-end; */
            min-height: 40px;
            height: auto;
        }
    }

    @media all and (max-width: 500px) {
        nav {
            flex-direction: column;
        }
    }
`

const Navigation = ({ onRouteChange, isSignedIn }) => {
    return (
        <HeaderStyles>
            {/* <Particles className='particles' params={particlesOptions} /> */}

            <nav>
                <Link to="/">Home</Link>

                {!isSignedIn && (
                    <>
                        <Link to="/login">Login</Link>

                        <Link to="/register">Register</Link>
                    </>
                )}

                {isSignedIn && (
                    <>
                        <Link to="/fast">Fast</Link>

                        <Link to="/logout">Logout</Link>
                    </>
                )}
            </nav>
        </HeaderStyles>
    )
}

export default Navigation
