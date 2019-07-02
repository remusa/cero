import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { REQUEST_RESET_MUTATION } from '../../gql/UserMutation'
import Error from '../ErrorMessage'
import Main from '../Layout/Main'
import FormStyles from '../styled/Form'

const RequestReset = () => {
    const [email, setEmail] = useState('')

    const handleChange = e => {
        setEmail(e.target.value)
    }

    const handleSubmit = async (e, action) => {
        e.preventDefault()
        await action().then(setEmail(''))
    }

    const [reset, { error, loading, called }] = useMutation(REQUEST_RESET_MUTATION, {
        variables: { email },
    })

    return (
        <Main>
            <FormStyles
                method='POST'
                onSubmit={e => {
                    handleSubmit(e, reset)
                }}
            >
                <fieldset disabled={loading} aria-busy={loading}>
                    <h2>Reset your password</h2>
                    <Error error={error} />
                    {!error && !loading && called && (
                        <p>Success! Check your email for the reset link!</p>
                    )}
                    <label htmlFor='email'>
                        Email
                        <input
                            required
                            type='email'
                            name='email'
                            placeholder='email'
                            value={email}
                            onChange={handleChange}
                        />
                    </label>
                    <button type='submit' className='reset'>
                        Reset password
                    </button>
                    <div className='divider' />
                </fieldset>
            </FormStyles>
        </Main>
    )
}

export default RequestReset
