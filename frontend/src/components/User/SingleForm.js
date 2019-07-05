import React, { useState } from 'react'
import styled from 'styled-components'
import Main from '../Layout/Main'
import Login from './Login'
import Register from './Register'

import './SingleForm.scss'

const SingleFormStyles = styled.div`
    grid-area: main;

    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;

    .single-form-container {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-column-gap: 4px;

        width: 580px;
        height: 450px;

        ::first-child {
            grid-column: 1;
        }

        ::last-child {
            grid-column: 2;
        }
    }

    form {
        width: 290px;
        height: 100%;
    }

    .active {
        z-index: 99;
    }

    .mask {
        display: flex;
        justify-content: center;
        align-items: center;

        font-family: 'Montserrat', sans-serif;
        font-weight: bold;
        /* line-height: 5rem;
        letter-spacing: 1px; */
        font-size: 3rem;
        border-radius: 20px;
        cursor: pointer;
        padding: 32px;

        /* width: auto; */
        /* height: 100%; */
        /* z-index: 99; */

        /* color: ${props => props.theme.colorWhite};
        background: ${props => props.theme.colorPrimary};
        box-shadow: 0 0 8px ${props => props.theme.boxShadow}; */
        color: white;
        background: hsl(146, 100%, 39%);
        box-shadow: 0 0 8px ${props => props.theme.boxShadow};

        &:hover,
        &:focus {
            background: hsl(146, 100%, 39%, 0.8);
        }
    }

    .button-toggle {
        font-family: 'Montserrat', sans-serif;
        font-weight: bold;

        outline: none;
        width: auto;
        background: ${props => props.theme.colorPrimary};
        color: ${props => props.theme.colorWhite};
        border: 0;
        border-radius: 3px;
        font-size: 1.5rem;
        font-weight: 600;
        padding: 0.5rem 1.2rem;
        margin: 8px 0 8px 0;

        @media all and (min-width: 601px) {
            display: none;
        }
    }

    @media all and (max-width: 600px) {
        .single-form-container {
            display: flex;
            flex-flow: column wrap;
            align-content: center;

            width: auto;
        }

        form {
            height: 420px;
        }

        .mask {
            display: none;
        }
    }
`

const SingleForm = props => {
    const [page, setPage] = useState('login')

    const changePage = () => {
        if (page === 'login') {
            setPage('register')
        } else {
            setPage('login')
        }
    }

    // <Main>
    return (
        <div className='SingleFormStyles'>
            <button className='button-toggle' type='button' onClick={changePage}>
                {page === 'login' ? 'Register' : 'Login'}
            </button>

            <div className='single-form-container'>
                {page === 'login' && (
                    <>
                        {/* <Login className='form' {...props} /> */}
                        <form action='submit'>
                            <input type='email' name='' id='' />
                            <input type='password' name='' id='' />
                            <button type='submit'>Submit</button>
                        </form>

                        <div className='mask' onClick={changePage}>
                            Create an account
                        </div>
                    </>
                )}

                {page === 'register' && (
                    <>
                        <div className='mask' onClick={changePage}>
                            Login to your account
                        </div>

                        {/* <Register className='form' {...props} /> */}
                        <form action='submit'>
                            <input type='email' name='' id='' />
                            <input type='password' name='' id='' />
                            <button type='submit'>Submit</button>
                        </form>
                    </>
                )}
            </div>
        </div>
    )
    // </Main>
}

export default SingleForm
