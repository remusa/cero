import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { REQUEST_RESET_MUTATION } from '../../gql/UserMutation'
import { emailValidation } from '../../lib/validationSchemas'
import Error from './../../components/ErrorMessage'
import Main from './../../components/Main'
import FormStyles from '../../components/styled/Form'

const validationSchema = yup.object().shape({
    email: emailValidation,
})

const RequestReset = () => {
    const [user, setUser] = useState({ email: '' })

    const [reset, { error, loading, called }] = useMutation(REQUEST_RESET_MUTATION, {
        variables: user,
    })

    const handleSubmit = async ({ email }, actions) => {
        setUser({ email })
        actions.setSubmitting(true)

        await reset()
        await setUser({ email: '' })
        await actions.setSubmitting(false)
        await actions.resetForm()
        await toast.warn('Check your email for confirmation', {
            position: 'bottom-right',
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
                    {({ values, errors, dirty, handleChange, isSubmitting }) => (
                        <Form>
                            <fieldset disabled={loading} aria-busy={loading}>
                                <h2>Reset password</h2>

                                <Error error={error} />

                                {!error && !loading && called && (
                                    <p>Success! Check your email for the reset link!</p>
                                )}

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

                                <button
                                    type="submit"
                                    disabled={loading || !dirty || isSubmitting}
                                    className="reset"
                                >
                                    Reset password
                                </button>

                                <div className="divider" />
                            </fieldset>
                        </Form>
                    )}
                </Formik>
            </FormStyles>
        </Main>
    )
}

export default RequestReset
