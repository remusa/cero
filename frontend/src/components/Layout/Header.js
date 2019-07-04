import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { animated, useSpring } from 'react-spring'
import styled from 'styled-components'
import logo from '../../static/logo.svg'
import Logout from '../User/Logout'
import User from '../User/User'

const ButtonStyles = styled.button`
    outline: 0;
    border-radius: 20px;
    border: 1px solid ${props => props.theme.colorPrimaryDarker};
    background-color: ${props => props.theme.colorPrimaryDarker};
    color: ${props => props.theme.colorWhite};
    font-size: 1.2rem;
    font-weight: bold;
    padding: 8px 15px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;

    &:hover,
    &:active {
        transform: scale(0.95);
    }

    &:focus {
        outline: none;
    }

    .ghost {
        background-color: transparent;
        border-color: #ffffff;
    }
`

const HeaderStyles = styled.header`
    grid-area: header;
    transition: 0.3s ease-in-out;

    nav {
        /* max-height: 340px; */
        background: ${props => props.theme.colorPrimary};
        text-align: center;
        padding-left: 16px;
        padding-right: 16px;

        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        align-content: center;
        align-items: center;

        a {
            outline: 0;
            /* padding: 4px; */
            margin: 4px;
            flex: 0 1 20px;
            color: ${props => props.theme.colorWhiteDark};

            /* padding: 12px 18px; */
            border-color: ${props => props.theme.colorWhite};
            background-color: transparent;
            border: 1px solid transparent;

            color: ${props => props.theme.colorWhite};
            padding: 8px 10px;
            border-radius: 3px;
            background: transparent;

            text-decoration: none;
            cursor: pointer;
            user-select: none;
        }

        span {
            padding: 8px 10px;
            margin: 4px;
            flex: 0 1 20px;
        }

        .nav__toggle {
            &__hamburguer {
                display: none;

                &:hover {
                    text-decoration: none;
                }
            }

            .logo img {
                max-width: 40px;
            }
        }

        .nav__links {
            & a {
                &:hover,
                &.active {
                    background: rgba(40, 28, 77, 0.7);
                }
            }

            &__admin {
                font-weight: 700;
                display: inline-block;

                & a {
                    color: red;
                    border-bottom: 2px solid red;

                    &:hover,
                    &.active {
                        background: rgba(200, 0, 0, 0.7);
                    }
                }
            }
        }
    }

    @media all and (max-width: 800px) {
        nav {
            justify-content: space-between;

            .nav__toggle {
                order: 0;
                color: ${props => props.theme.colorWhite};
            }
        }
    }

    @media all and (max-width: 500px) {
        nav {
            height: auto;
            flex-flow: column wrap;

            .nav__toggle {
                display: flex;
                flex-flow: column wrap;
                justify-content: center;
                align-content: center;

                &__hamburguer {
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

                &__admin {
                    /* margin: 0; */
                    /* padding-bottom: 8px; */
                }

                &__user {
                    /* margin: 0; */
                    /* padding-top: 4px; */
                    /* padding-bottom: 4px; */
                }
            }
        }
    }
`

const Navigation = () => {
    const [width, setWidth] = useState(window.innerWidth)
    const initialToggle = () => localStorage.getItem('toggled') || false
    const [toggled, setToggled] = useState(false)

    const headerAnimations = useSpring({
        opacity: toggled ? 1 : 0,
        marginTop: toggled ? 0 : -1000,
        transform: `perspective(600px) rotateX(${toggled ? 0 : 180}deg)`,
        config: { mass: 5, tension: 500, friction: 80 },
    })

    const handleClick = () => {
        if (width >= 500) {
            setToggled(true)
        } else {
            setToggled(false)
        }
    }

    const handleToggle = () => {
        setToggled(!toggled)
    }

    useEffect(() => {
        function updateWindowDimensions() {
            setWidth(window.innerWidth)
            if (width >= 500) {
                setToggled(true)
            }
        }

        window.addEventListener('resize', updateWindowDimensions)
        updateWindowDimensions()

        return () => {
            window.removeEventListener('resize', updateWindowDimensions)
        }
    }, [width])

    return (
        <User>
            {({ data }) => {
                const me = data ? data.me : null

                return (
                    <HeaderStyles>
                        <nav>
                            <div
                                className='nav__toggle'
                                style={toggled ? { marginBottom: '4px' } : { marginBottom: 0 }}
                            >
                                <a className='nav__toggle__hamburguer' onClick={handleToggle}>
                                    ☰
                                </a>

                                {width > 500 && (
                                    <Link to='/' className='logo' onClick={handleClick}>
                                        <img src={logo} alt='logo' />
                                    </Link>
                                )}
                            </div>

                            {/* <animated.div className='nav__links' style={headerAnimations}> */}
                            {/* </animated.div> */}

                            {(toggled || width > 500) && (
                                <animated.div style={headerAnimations} className='nav__links'>
                                    {width < 500 && (
                                        <Link to='/' onClick={handleClick}>
                                            Home
                                        </Link>
                                    )}

                                    {me && (
                                        <>
                                            {me.permissions.includes('ADMIN') && (
                                                <span className='nav__links__admin'>
                                                    <NavLink
                                                        to='/admin'
                                                        activeClassName='active'
                                                        onClick={handleClick}
                                                    >
                                                        ✪ Admin
                                                    </NavLink>
                                                </span>
                                            )}

                                            <NavLink to='/fast' onClick={handleClick}>
                                                🔥 Fast
                                            </NavLink>

                                            <span className='nav__links__user'>
                                                <NavLink
                                                    to='/profile'
                                                    activeClassName='active'
                                                    onClick={handleClick}
                                                >
                                                    ★ {me.name}
                                                </NavLink>
                                            </span>

                                            <Logout />
                                        </>
                                    )}

                                    {!me && (
                                        <>
                                            <NavLink
                                                to='/login'
                                                activeClassName='active'
                                                onClick={handleClick}
                                            >
                                                Login
                                            </NavLink>

                                            <NavLink
                                                to='/register'
                                                activeClassName='active'
                                                onClick={handleClick}
                                            >
                                                Register
                                            </NavLink>
                                        </>
                                    )}
                                </animated.div>
                            )}
                        </nav>
                    </HeaderStyles>
                )
            }}
        </User>
    )
}

export default Navigation
