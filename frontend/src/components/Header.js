import React from 'react'
import PropTypes from 'prop-types'
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
        width: 100vw;
        text-align: center;
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between; /* flex-end */
        align-content: center;

        a {
            padding: 4px;
            margin: 4px;
            flex: 0 1 20px;
            color: #fff;
        }
    }

    @media all and (max-width: 800px) {
        nav {
            justify-content: space-evenly;
            /* min-height: 40px; */
            /* height: auto; */
        }
    }

    @media all and (max-width: 500px) {
        nav {
            flex-flow: column wrap;
        }
    }
`

const Navigation = ({ onRouteChange, isSignedIn }) => (
    <HeaderStyles>
        {/* <Particles className='particles' params={particlesOptions} /> */}

        <nav>
            <Link to='/'>Home</Link>

            <>
                {/* TODO: remove comments */}

                {/* {isSignedIn && ( */}
                <>
                    <Link to='/fast'>Fast</Link>
                    <Link to='/logout'>Logout</Link>
                </>
                {/* )} */}

                {/* {!isSignedIn && ( */}
                <>
                    <Link to='/login'>Login</Link>
                    <Link to='/register'>Register</Link>
                </>
                {/* )} */}
            </>
        </nav>
    </HeaderStyles>
)

Navigation.propTypes = {
    onRouteChange: PropTypes.func.isRequired,
    isSignedIn: PropTypes.func.isRequired,
}

export default Navigation
