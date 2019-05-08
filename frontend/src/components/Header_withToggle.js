import React, {Component} from 'react'
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
        justify-content: space-between;
        align-content: center;
        align-items: center;

        .nav__toggle {
            visibility: hidden;
            cursor: pointer;
        }

        a {
            padding: 4px;
            margin: 4px;
            flex: 0 1 20px;
            color: #fff;
        }
    }

    @media all and (max-width: 800px) {
        nav {
            justify-content: space-between;
        }
    }

    @media all and (max-width: 500px) {
        nav {
            flex-flow: column wrap;

            .nav__toggle {
                visibility: visible;
            }

            .nav__links {
                display: flex;
                flex-flow: column wrap;
            }
        }
    }
`

// const HamburguerStyles = styled.div`
//     width: 7px;
//     cursor: pointer;
//     color: red;

//     /* visibility: hidden; */

//     @media all and (max-width: 500px) {
//         visibility: visible;
//     }
// `

class Navigation extends Component {
    static propTypes = {
        // onRouteChange: PropTypes.func.isRequired,
        isSignedIn: PropTypes.bool.isRequired,
    }

    state = {
        isToggled: false,
    }

    toggleMenu = (e) => {
        const {isToggled} = this.state

        this.setState({
            isToggled: !isToggled,
        })
    }

    render() {
        const { isSignedIn } = this.props //onRouteChange
        const {isToggled} = this.state

        return (
            <HeaderStyles>
                {/* <Particles className='particles' params={particlesOptions} /> */}

                <nav>
                    <a href='#' className="nav__toggle" onClick={this.toggleMenu}>☰</a>

                    <div className='nav__links'>
                        {isToggled && (
                            <>
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
                            </>
                        )}
                    </div>

                </nav>
            </HeaderStyles>
        )
    }
}

export default Navigation
