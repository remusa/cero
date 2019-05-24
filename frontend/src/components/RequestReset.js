import React, { useState } from 'react'
import { Mutation } from 'react-apollo'

import Form from './styled/Form'
import Error from './ErrorMessage'
import Main from './Main'

import { REQUEST_RESET_MUTATION } from '../gql/UserMutation'

const RequestReset = () => {
    const [email, setEmail] = useState('')

    const handleChange = e => {
        setEmail(e.target.value)
    }

    // TODO: find a generic event handler
    const handleSubmit = async (e, reset) => {
        e.preventDefault()
        await reset()
        setEmail('')
    }

    return (
        <Mutation mutation={REQUEST_RESET_MUTATION} variables={{ email }}>
            {(reset, { error, loading, called }) => (
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
                    </Form>
                </Main>
            )}
        </Mutation>
    )
}

export default RequestReset
