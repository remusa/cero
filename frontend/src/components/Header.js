import React, { useState, useEffect } from 'react'
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
const Navigation = props => {
    const [toggled, setToggled] = useState(false)
    const [width, setWidth] = useState(window.innerWidth)

    const toggleMenu = e => {
        setToggled(!toggled)
    }

    const updateWindowDimensions = () => {
        setWidth(window.innerWidth)
        if (width > 500) {
            setToggled(false)
        }
    }

    useEffect(() => {
        // componentDidMount()
        updateWindowDimensions()
        window.addEventListener('resize', updateWindowDimensions)

        // componentWillUnmount
        return () => {
            window.removeEventListener('resize', updateWindowDimensions)
        }
    })

    return (
        <User>
            {({ data }) => {
                const me = data ? data.me : null
                return (
                    <HeaderStyles>
                        <nav>
                            <div
                                className="nav__toggle__container"
                                style={toggled ? { marginBottom: '4px' } : { marginBottom: 0 }}>
                                <a href="#" className="nav__toggle" onClick={toggleMenu}>
                                    ☰
                                </a>

                                {(toggled || width > 500) && (
                                    <Link to="/" className="logo">
                                        <img src={logo} alt="logo" />
                                    </Link>
                                )}
                            </div>

                            <div className="nav__links">
                                {(toggled || width > 500) && (
                                    <>
                                        {me && (
                                            <>
                                                <Link to="/fast">Fast</Link>
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

export default Navigation
