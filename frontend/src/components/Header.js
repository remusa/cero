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
        width: 100%;
        text-align: center;
        display: flex;
        flex-flow: row wrap;
        justify-content: flex-end;
    }

    a {
        margin-left: 8px;
        flex: 0 1 20px;
    }

    @media all and (max-width: 800px) {
        nav {
            /* justify-content: space-around; */
        }
    }

    @media all and (max-width: 500px) {
        nav {
            flex-direction: column;
        }

        a {
            margin-top: 8px;
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
                    <Link to="/logout">Logout</Link>
                )}
            </nav>
        </HeaderStyles>
    )
}

export default Navigation
