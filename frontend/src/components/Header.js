import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import User from './User'
import Logout from './Logout'
import logo from '../logo.svg'

const HeaderStyles = styled.header`
    grid-area: header;

    nav {
        /* background-image: radial-gradient(circle, var(--color-primary), var(--color-primary-darker)); */
        background: var(--color-primary);
        text-align: center;
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        align-content: center;
        align-items: center;

        a {
            padding: 4px;
            margin: 4px;
            flex: 0 1 20px;
            color: #fff;
        }

        .nav__toggle__container {
            .nav__toggle {
                display: none;
                cursor: pointer;
            }
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

            .nav__toggle__container {
                display: flex;
                flex-flow: column wrap;
                justify-content: center;
                align-content: center;

                .nav__toggle {
                    display: block;
                    order: 1;
                }

                .logo {
                    order: 2;
                }
            }

            .nav__links {
                display: flex;
                flex-flow: column wrap;
            }
        }
    }
`
// TODO: refactor to use hooks
class Navigation extends Component {
    state = {
        isToggled: false,
        width: window.innerWidth,
    }

    toggleMenu = e => {
        const { isToggled } = this.state
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
        this.setState({ width: window.innerWidth })
    }

    render() {
        const { isToggled, width } = this.state

        return (
            <User>
                {({ data }) => {
                    const me = data ? data.me : null
                    return (
                        <HeaderStyles>
                            <nav>
                                <div
                                    className="nav__toggle__container"
                                    style={
                                        isToggled ? { marginBottom: '4px' } : { marginBottom: 0 }
                                    }>
                                    <a href="#" className="nav__toggle" onClick={this.toggleMenu}>
                                        ☰
                                    </a>

                                    {(isToggled || width > 500) && (
                                        <Link to="/" className="logo">
                                            <img src={logo} alt="logo" />
                                        </Link>
                                    )}
                                </div>

                                <div className="nav__links">
                                    {(isToggled || width > 500) && (
                                        <>
                                            {me && (
                                                <>
                                                    <Link to="/fast">Fast</Link>
                                                    {/* <Link to="/logout">Logout</Link> */}
                                                    <Logout />
                                                </>
                                            )}

                                            {!me && (
                                                <>
                                                    <Link to="/login">Login</Link>
                                                    <Link to="/register">Register</Link>
                                                </>
                                            )}
                                        </>
                                    )}
                                </div>
                            </nav>
                        </HeaderStyles>
                    )
                }}
            </User>
        )
    }
}

export default Navigation
