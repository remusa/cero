import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Field, Form, Formik, ErrorMessage } from 'formik'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import * as yup from 'yup'
import { SIGNIN_MUTATION } from '../../gql/UserMutation'
import { CURRENT_USER_QUERY } from '../../gql/UserQuery'
import Error from '../ErrorMessage'
import Main from '../Layout/Main'
import FormStyles from '../styled/Form'

export const ResetStyles = styled.div`
    padding: 4px;
    margin-top: 8px;
    font-size: 1.3rem;
    color: var(--color-grey);
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }

    &:active {
        color: var(--color-grey);
    }
`

const validationSchema = yup.object().shape({
    email: yup
        .string()
        .email('Invalid email')
        .required('Email is required'),
    password: yup
        .string()
        .min(10, 'Password must be at least 10 characters long')
        .max(25, 'Password must be max. 25 characters')
        .required('Password is required'),
})

const Login = props => {
    const [user, setUser] = useState({ email: '', password: '' })

    const [signin, { error, loading }] = useMutation(SIGNIN_MUTATION, {
        variables: user,
        refetchQueries: [{ query: CURRENT_USER_QUERY }],
        onCompleted: () => props.history.push('/fast'),
    })

    const handleSubmit = async ({ email, password }, actions) => {
        actions.setSubmitting(true)
        setUser({ email, password })

        await signin()
        await actions.setSubmitting(false)
        await toast.success('Welcome!', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
        })
    }

    return (
        <Main>
            <FormStyles>
                <Formik
                    initialValues={user}
                    validationSchema={validationSchema}
                    onSubmit={(values, actions) => {
                        handleSubmit(values, actions)
                    }}
                >
                    {({ values, dirty, handleChange, handleReset, isSubmitting }) => (
                        <Form>
                            <fieldset disabled={loading} aria-busy={loading}>
                                <h2>Login to your account</h2>

                                <Error error={error} />

                                <label htmlFor='email'>
                                    Email
                                    <Field
                                        type='email'
                                        name='email'
                                        placeholder='your_email@example.com'
                                        value={values.email}
                                        onChange={handleChange}
                                        required
                                    />
                                    <ErrorMessage
                                        name='email'
                                        component='div'
                                        className='errorMessage'
                                    />
                                </label>

                                <label htmlFor='password'>
                                    Password
                                    <Field
                                        required
                                        type='password'
                                        name='password'
                                        placeholder='*****'
                                        value={values.password}
                                        onChange={handleChange}
                                    />
                                    <ErrorMessage
                                        name='password'
                                        component='div'
                                        className='errorMessage'
                                    />
                                </label>

                                <button type='submit' disabled={loading || !dirty || isSubmitting}>
                                    Login
                                </button>

                                <button
                                    type='button'
                                    disabled={!dirty}
                                    component='div'
                                    onClick={handleReset}
                                    className='resetButton'
                                >
                                    Reset
                                </button>

                                <Link to='/requestreset'>
                                    <ResetStyles>Reset password</ResetStyles>
                                </Link>

                                <div className='divider' />
                            </fieldset>
                        </Form>
                    )}
                </Formik>
            </FormStyles>
        </Main>
    )
}

export default Login
