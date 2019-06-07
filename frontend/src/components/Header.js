import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
// import logo from '../logo.svg'
import logo from '../static/logo.svg'
import Logout from './Logout'
import User from './User'

const HeaderStyles = styled.header`
    grid-area: header;
    transition: 0.3s ease-in-out;

    nav {
        height: 60px;
        background: var(--color-primary);
        text-align: center;
        padding-left: 16px;
        padding-right: 16px;

        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        align-content: center;
        align-items: center;

        a {
            padding: 4px;
            margin: 4px;
            flex: 0 1 20px;
            /* color: var(--color-grey-dark); */
            color: var(--color-white-dark);

            &:hover {
                /* font-weight: 600; */
                text-decoration: underline;
            }
        }

        .nav__hamburguer:hover {
            text-decoration: none;
        }

        .nav__toggle__container {
            .nav__toggle {
                display: none;
                cursor: pointer;
            }

            .logo img {
                max-width: 50px;
            }
        }

        .nav__links {
            &__admin {
                font-weight: 700;
                margin-right: 48px;
                display: inline-block;

                & a {
                    color: red;
                }
            }

            &__user {
                font-weight: 600;
                color: var(--color-white);
                margin-right: 8px;

                &:hover {
                    cursor: pointer;
                    text-decoration: underline;
                }
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
            height: auto;
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

                &__admin {
                    margin: 0;
                    padding-bottom: 8px;
                }

                &__user {
                    margin: 0;
                    padding-top: 4px;
                    padding-bottom: 4px;
                }
            }
        }
    }
`

const Navigation = () => {
    const initialToggle = () => localStorage.getItem('toggled') || false
    const [toggled, setToggled] = useState(initialToggle)
    const [width, setWidth] = useState(window.innerWidth)

    const handleToggle = () => {
        setToggled(!toggled)
    }

    useEffect(() => {
        function updateWindowDimensions() {
            setWidth(window.innerWidth)
            if (width >= 500) {
                setToggled(false)
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
                                className='nav__toggle__container'
                                style={toggled ? { marginBottom: '4px' } : { marginBottom: 0 }}
                            >
                                <a className='nav__toggle nav__hamburguer' onClick={handleToggle}>
                                    ☰
                                </a>

                                {(toggled || width > 500) && (
                                    <Link to='/' className='logo'>
                                        <img src={logo} alt='logo' />
                                    </Link>
                                )}
                            </div>

                            <div className='nav__links'>
                                {(toggled || width > 500) && (
                                    <>
                                        {me && (
                                            <>
                                                {me.permissions.includes('ADMIN') && (
                                                    <div className='nav__links__admin'>
                                                        <Link to='/admin'>Admin</Link>
                                                    </div>
                                                )}

                                                <span className='nav__links__user'>
                                                    {/* <Link to='/profile'>{me.name}</Link> */}
                                                    {me.name}
                                                </span>
                                                <Link to='/fast'>Fast</Link>
                                                <Logout />
                                            </>
                                        )}
                                        {!me && (
                                            <>
                                                <Link to='/login'>Login</Link>
                                                <Link to='/register'>Register</Link>
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
