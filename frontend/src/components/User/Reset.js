import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/react-hooks'
import queryString from 'query-string'
import { RESET_MUTATION } from '../../gql/UserMutation'
import { CURRENT_USER_QUERY } from '../../gql/UserQuery'
import Error from '../ErrorMessage'
import Main from '../Layout/Main'
import Form from '../styled/Form'

const Reset = props => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const search = queryString.parse(props.location.search)
    const { resetToken } = search

    const resetState = () => {
        setPassword('')
        setConfirmPassword('')
    }

    const handleChange = e => {
        const { name, value } = e.target
        if (name === 'password') setPassword(value)
        else if (name === 'confirmPassword') setConfirmPassword(value)
    }

    const handleSubmit = async (e, action) => {
        e.preventDefault()
        await action().then(resetState())
    }

    const [reset, { error, loading }] = useMutation(RESET_MUTATION, {
        variables: { resetToken, password, confirmPassword },
        refetchQueries: [{ query: CURRENT_USER_QUERY }],
        onCompleted: () => props.history.push('/fast'),
    })

    return (
        <Main>
            <Form
                method='POST'
                onSubmit={e => {
                    handleSubmit(e, reset)
                }}
            >
                <fieldset disabled={loading} aria-busy={loading}>
                    <h2>Reset your password</h2>
                    <Error error={error} />
                    {/* {formError && <p>{formError}</p>} */}
                    <label htmlFor='password'>
                        Password
                        <input
                            required
                            type='password'
                            name='password'
                            placeholder='*****'
                            value={password}
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
                            value={confirmPassword}
                            onChange={handleChange}
                        />
                    </label>
                    <button type='submit'>Reset password</button>
                </fieldset>
            </Form>
        </Main>
    )
}

Reset.propTypes = {
    // resetToken: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
}

export default Reset
