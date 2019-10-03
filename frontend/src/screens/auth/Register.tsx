import { useMutation } from '@apollo/react-hooks'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import FormStyles from '../../components/styled/Form'
import { SIGNUP_MUTATION } from '../../gql/UserMutation'
import { CURRENT_USER_QUERY } from '../../gql/UserQuery'
import { confirmPasswordValidation, emailValidation, passwordValidation, usernameValidation } from '../../lib/validationSchemas'
import Error from './../../components/ErrorMessage'
import { IUser, ResetStyles } from './Login'

const validationSchema = yup.object().shape({
    name: usernameValidation,
    email: emailValidation,
    password: passwordValidation,
    confirmPassword: confirmPasswordValidation,
})


interface IRUser extends IUser {
    name: string
    confirmPassword: string
}

const Register: React.FC = props => {
    const [user, setUser] = useState<IRUser>({
        email: '',
        name: '',
        password: '',
        confirmPassword: '',
    })

    const [signup, { error, loading }] = useMutation(SIGNUP_MUTATION, {
        variables: user,
        refetchQueries: [{ query: CURRENT_USER_QUERY }],
        onCompleted: () => props.history.push('/fast'),
    })

    const handleSubmit = async ({ email, name, password, confirmPassword }: IRUser, actions) => {
        setUser({ email, name, password, confirmPassword })
        actions.setSubmitting(true)

        await signup()
        await actions.setSubmitting(false)
        await toast.success('Welcome!', {
            position: 'bottom-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
        })
    }

    // <ParticlesStyles />

    return (
        // <Main>
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
                        {/* style={{ width: '290px', height: '420px' }} */}
                        <fieldset disabled={loading} aria-busy={loading}>
                            <div className="fields">
                                <h2>Register</h2>

                                <Error error={error} />

                                <label htmlFor="name">
                                    Username
                                    <Field
                                        required
                                        type="text"
                                        name="name"
                                        placeholder="Username"
                                        value={values.name}
                                        onChange={handleChange}
                                    />
                                    <ErrorMessage
                                        name="name"
                                        component="div"
                                        className="errorMessage"
                                    />
                                </label>

                                <label htmlFor="email">
                                    Email
                                    <Field
                                        required
                                        type="email"
                                        name="email"
                                        placeholder="your_email@example.com"
                                        value={values.email}
                                        onChange={handleChange}
                                    />
                                    <ErrorMessage
                                        name="email"
                                        component="div"
                                        className="errorMessage"
                                    />
                                </label>

                                <label htmlFor="password">
                                    Password
                                    <Field
                                        required
                                        type="password"
                                        name="password"
                                        placeholder="*****"
                                        value={values.password}
                                        onChange={handleChange}
                                    />
                                    <ErrorMessage
                                        name="password"
                                        component="div"
                                        className="errorMessage"
                                    />
                                </label>

                                <label htmlFor="confirmPassword">
                                    Confirm Password
                                    <Field
                                        required
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="*****"
                                        value={values.confirmPassword}
                                        onChange={handleChange}
                                    />
                                    <ErrorMessage
                                        name="confirmPassword"
                                        component="div"
                                        className="errorMessage"
                                    />
                                </label>
                            </div>

                            <div className="buttons">
                                <button type="submit" disabled={loading || !dirty || isSubmitting}>
                                    Register
                                </button>

                                <button
                                    type="button"
                                    disabled={!dirty}
                                    onClick={handleReset}
                                    className="resetButton"
                                >
                                    Reset
                                </button>

                                <Link to="/requestreset">
                                    <ResetStyles>Forgot password?</ResetStyles>
                                </Link>

                                {/* <div className='divider' /> */}
                            </div>

                            {/* <pre>{JSON.stringify(values, null, 2)}</pre>
                                <pre>{JSON.stringify(errors, null, 2)}</pre> */}
                        </fieldset>
                    </Form>
                )}
            </Formik>
        </FormStyles>
        // </Main>
    )
}

export default Register
