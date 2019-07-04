import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { toast } from 'react-toastify'
import { Field, Form, Formik, ErrorMessage } from 'formik'
import * as yup from 'yup'
import { Link } from 'react-router-dom'
import { SIGNUP_MUTATION } from '../../gql/UserMutation'
import { CURRENT_USER_QUERY } from '../../gql/UserQuery'
import Error from '../ErrorMessage'
import Main from '../Layout/Main'
import FormStyles from '../styled/Form'
import { ResetStyles } from './Login'
import ParticlesStyles from '../Layout/Particles'
import {
    usernameValidation,
    emailValidation,
    passwordValidation,
    confirmPasswordValidation,
} from '../../lib/validationSchemas'

const validationSchema = yup.object().shape({
    name: usernameValidation,
    email: emailValidation,
    password: passwordValidation,
    confirmPassword: confirmPasswordValidation,
})

const Register = props => {
    const [user, setUser] = useState({ email: '', name: '', password: '', confirmPassword: '' })

    const [signup, { error, loading }] = useMutation(SIGNUP_MUTATION, {
        variables: user,
        refetchQueries: [{ query: CURRENT_USER_QUERY }],
        onCompleted: () => props.history.push('/fast'),
    })

    const handleSubmit = async ({ email, name, password, confirmPassword }, actions) => {
        setUser({ email, name, password, confirmPassword })
        actions.setSubmitting(true)

        await signup()
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
            {/* <ParticlesStyles /> */}
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
                                <h2>Register</h2>

                                <Error error={error} />

                                <label htmlFor='name'>
                                    Username
                                    <Field
                                        required
                                        type='text'
                                        name='name'
                                        placeholder='Username'
                                        value={values.name}
                                        onChange={handleChange}
                                    />
                                    <ErrorMessage
                                        name='name'
                                        component='div'
                                        className='errorMessage'
                                    />
                                </label>

                                <label htmlFor='email'>
                                    Email
                                    <Field
                                        required
                                        type='email'
                                        name='email'
                                        placeholder='your_email@example.com'
                                        value={values.email}
                                        onChange={handleChange}
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

                                <label htmlFor='confirmPassword'>
                                    Confirm Password
                                    <Field
                                        required
                                        type='password'
                                        name='confirmPassword'
                                        placeholder='*****'
                                        value={values.confirmPassword}
                                        onChange={handleChange}
                                    />
                                    <ErrorMessage
                                        name='confirmPassword'
                                        component='div'
                                        className='errorMessage'
                                    />
                                </label>

                                <button type='submit' disabled={loading || !dirty || isSubmitting}>
                                    Register
                                </button>

                                <button
                                    type='button'
                                    disabled={!dirty}
                                    onClick={handleReset}
                                    className='resetButton'
                                >
                                    Reset
                                </button>

                                <Link to='/requestreset'>
                                    <ResetStyles>Forgot password?</ResetStyles>
                                </Link>

                                <div className='divider' />

                                {/* <pre>{JSON.stringify(values, null, 2)}</pre>
                                <pre>{JSON.stringify(errors, null, 2)}</pre> */}
                            </fieldset>
                        </Form>
                    )}
                </Formik>
            </FormStyles>
        </Main>
    )
}

export default Register
