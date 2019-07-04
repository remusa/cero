import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/react-hooks'
import { toast } from 'react-toastify'
import { Field, Form, Formik, ErrorMessage } from 'formik'
import * as yup from 'yup'
import queryString from 'query-string'
import { RESET_MUTATION } from '../../gql/UserMutation'
import { CURRENT_USER_QUERY } from '../../gql/UserQuery'
import Error from '../ErrorMessage'
import Main from '../Layout/Main'
import FormStyles from '../styled/Form'
import { passwordValidation, confirmPasswordValidation } from '../../lib/validationSchemas'

const validationSchema = yup.object().shape({
    password: passwordValidation,
    confirmPassword: confirmPasswordValidation,
})

const Reset = props => {
    const [user, setUser] = useState({
        password: '',
        confirmPassword: '',
    })

    const search = queryString.parse(props.location.search)
    const { resetToken } = search

    const [reset, { error, loading }] = useMutation(RESET_MUTATION, {
        variables: { resetToken, ...user },
        refetchQueries: [{ query: CURRENT_USER_QUERY }],
        onCompleted: () => props.history.push('/fast'),
    })

    const handleSubmit = async ({ password, confirmPassword }, actions) => {
        setUser({ password, confirmPassword })
        actions.setSubmitting(true)

        await reset()
        await setUser({ password: '', confirmPassword: '' })
        await actions.setSubmitting(false)
        await actions.resetForm()
        await toast.success('Your password has been reset', {
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
                    {({ values, errors, dirty, handleChange, isSubmitting }) => (
                        <Form>
                            <fieldset disabled={loading} aria-busy={loading}>
                                <h2>Reset your password</h2>

                                <Error error={error} />

                                <label htmlFor='password'>
                                    Password
                                    <input
                                        required
                                        type='password'
                                        name='password'
                                        placeholder='*****'
                                        value={values.password}
                                        onChange={handleChange}
                                    />
                                </label>

                                <label htmlFor='confirmPassword'>
                                    Confirm Password
                                    <input
                                        required
                                        type='password'
                                        name='confirmPassword'
                                        placeholder='*****'
                                        value={values.confirmPassword}
                                        onChange={handleChange}
                                    />
                                </label>

                                <button
                                    type='submit'
                                    disabled={loading || !dirty || isSubmitting}
                                    className='reset'
                                >
                                    Reset password
                                </button>
                            </fieldset>
                        </Form>
                    )}
                </Formik>
            </FormStyles>
        </Main>
    )
}

Reset.propTypes = {
    // resetToken: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
}

export default Reset
