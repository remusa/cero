import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import * as yup from 'yup'
import { SIGNIN_MUTATION, SIGNUP_MUTATION } from '../../gql/UserMutation'
import { CURRENT_USER_QUERY } from '../../gql/UserQuery'
import Error from '../ErrorMessage'
import Main from '../Layout/Main'
import FormStyles from '../styled/Form'
import Login from './Login'
import Register from './Register'

const SingleFormStyles = styled.div`
    button {
        margin-bottom: 8px;

        outline: none;
        width: auto;
        background: ${props => props.theme.colorPrimary};
        color: ${props => props.theme.colorWhite};
        border: 0;
        border-radius: 3px;
        font-size: 1.5rem;
        font-weight: 600;
        padding: 0.5rem 1.2rem;

        margin-right: 8px;
    }
`

export const ResetStyles = styled.div`
    padding: 4px;
    margin-top: 8px;
    font-size: 1.3rem;
    color: ${props => props.theme.colorReset};
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }

    &:active {
        color: ${props => props.theme.colorGrey};
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

    return (
        <Main>
            <SingleFormStyles>
                <button type='button' onClick={changePage}>
                    {page === 'login' ? 'Register' : 'Login'}
                </button>

                {page === 'login' ? <Login {...props} /> : <Register {...props} />}
            </SingleFormStyles>
        </Main>
    )
}

export default SingleForm
