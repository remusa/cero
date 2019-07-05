import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import * as yup from 'yup'
import { onClickOutside } from 'react-onclickoutside'
import { SIGNIN_MUTATION, SIGNUP_MUTATION } from '../../gql/UserMutation'
import { CURRENT_USER_QUERY } from '../../gql/UserQuery'
import Error from '../ErrorMessage'
import Main from '../Layout/Main'
import FormStyles from '../styled/Form'
import Login from './Login'
import Register from './Register'

const SingleFormStyles = styled.div`
    grid-area: main;

    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;

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

    .single-form {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 4px;

        height: 450px;
        width: calc(290px * 2);

        ::first-child {
            grid-column: 1;
        }

        ::last-child {
            grid-column: 2;
        }

        form {
            width: 290px;
            height: 100%;
        }

        .mask {
            display: grid;
            justify-content: center;
            align-items: center;

            font-family: 'Montserrat', sans-serif;
            font-weight: bold;
            line-height: 5rem;
            letter-spacing: 1px;

            width: auto;
            height: 100%;
            color: ${props => props.theme.colorWhite};
            background: ${props => props.theme.colorPrimary};
            box-shadow: 0 0 8px ${props => props.theme.boxShadow};
            font-size: 3rem;
            border-radius: 20px;
            cursor: pointer;
            padding: 32px;
        }

        @media all and (max-width: 600px) {
            display: flex;
            flex-flow: column wrap;
            align-content: center;

            width: auto;

            form {
                height: 420px;
            }

            .mask {
                display: none;
            }
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
        <SingleFormStyles>
            <button className='button-toggle' type='button' onClick={changePage}>
                {page === 'login' ? 'Register' : 'Login'}
            </button>

            <div className='single-form'>
                {page === 'login' && (
                    <>
                        <Login className='form' {...props} />

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

                        <Register className='form' {...props} />
                    </>
                )}
            </div>
        </SingleFormStyles>
    )
    // </Main>
}

export default SingleForm
