import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Form from './styled/Form'
import Error from './ErrorMessage'
import Main from './Main'

const REQUEST_RESET_MUTATION = gql`
    mutation REQUEST_RESET_MUTATION($email: String!) {
        requestReset(email: $email) {
            message
        }
    }
`

const initialState = {
    email: '',
}

// TODO: refactor to use hooks
class RequestReset extends Component {
    state = initialState

    handleChange = e => {
        const { name, value } = e.target
        this.setState({
            [name]: value,
        })
    }

    handleSubmit = async (e, reset) => {
        e.preventDefault()
        await reset()
        this.setState = initialState
    }

    render() {
        const { email } = this.state

        return (
            <Mutation mutation={REQUEST_RESET_MUTATION} variables={this.state}>
                {(reset, { error, loading, called }) => (
                    <Main>
                        <Form
                            method='POST'
                            onSubmit={e => {
                                this.handleSubmit(e, reset)
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
                                        onChange={this.handleChange}
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
}

export default RequestReset
export { REQUEST_RESET_MUTATION }
