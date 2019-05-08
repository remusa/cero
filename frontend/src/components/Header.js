import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Particles from 'react-particles-js'
// import logo from '../logo.svg'
import logo from '../static/icons/tomato.svg'

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
        height: 40px;
        text-align: center;
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        align-content: center;
        align-items: center;

        .nav__toggle__container {
            padding: 2px;
            margin-bottom: 4px;

            & .logo {
                /* width: auto; */
                height: 25px;
            }

            .nav__toggle {
                display: none;
                cursor: pointer;
            }
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

            .nav__toggle {
                order: 1;
            }
        }
    }

    @media all and (max-width: 500px) {
        nav {
            flex-flow: column wrap;

            .nav__toggle {
                display: block;
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
        width: window.innerWidth,
    }

    toggleMenu = (e) => {
        const {isToggled} = this.state

        this.setState({
            isToggled: !isToggled,
        })
    }

    componentDidMount() {
        this.updateWindowDimensions()
        window.addEventListener('resize', this.updateWindowDimensions)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions)
    }

    updateWindowDimensions = () => {
        this.setState({ width: window.innerWidth})
    }

    render() {
        const { isSignedIn } = this.props //onRouteChange
        const { isToggled, width } = this.state

        return (
            <HeaderStyles>
                {/* <Particles className='particles' params={particlesOptions} /> */}

                <nav>
                       <div className='nav__toggle__container' style={isToggled ? {marginBottom: '4px'} : {marginBottom: 0}}>
                            <a href='#' className="nav__toggle" onClick={this.toggleMenu}
                            >☰</a>

                            {(isToggled || width > 500) && (
                            <Link to='/'><img src={logo} alt="logo" className='logo'/></Link>)}
                       </div>

                        <div className='nav__links'>
                            {(isToggled || width > 500) && (
                                <>
                                    {/* <Link to='/'>Home</Link> */}

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
