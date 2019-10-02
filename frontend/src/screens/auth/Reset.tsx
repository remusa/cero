import { useMutation } from '@apollo/react-hooks'
import { Form, Formik } from 'formik'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { RESET_MUTATION } from '../../gql/UserMutation'
import { CURRENT_USER_QUERY } from '../../gql/UserQuery'
import { confirmPasswordValidation, passwordValidation } from '../../lib/validationSchemas'
import Main from './../../components/Main'
import FormStyles from './../../components/styled/Form'
import Error from './../../components/ErrorMessage'

const validationSchema = yup.object().shape({
    password: passwordValidation,
    confirmPassword: confirmPasswordValidation,
})

interface Props {
    location: object
    history: any
}

const Reset = ({ props }: Props) => {
    const [user, setUser] = useState<object>({
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
                                <h2>Reset your password</h2>

                                <Error error={error} />

                                <label htmlFor="password">
                                    Password
                                    <input
                                        required
                                        type="password"
                                        name="password"
                                        placeholder="*****"
                                        value={values.password}
                                        onChange={handleChange}
                                    />
                                </label>

                                <label htmlFor="confirmPassword">
                                    Confirm Password
                                    <input
                                        required
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="*****"
                                        value={values.confirmPassword}
                                        onChange={handleChange}
                                    />
                                </label>

                                <button
                                    type="submit"
                                    disabled={loading || !dirty || isSubmitting}
                                    className="reset"
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
