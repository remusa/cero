import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Form from './styled/Form'
import { CURRENT_USER_QUERY } from './User'

const SIGNIN_MUTATION = gql`
    mutation SIGNIN_MUTATION($email: String!, $password: String!) {
        signin(email: $email, password: $password) {
            id
            email
            name
        }
    }
`

const initialState = {
    email: '',
    name: '',
    password: '',
}

class Login extends Component {
    state = initialState

    handleChange = e => {
        const { name, value } = e.target
        this.setState({
            [name]: value,
        })
    }

    handleSubmit = async (e, signup) => {
        e.preventDefault()

        await signup()
        this.setState = initialState
    }

    render() {
        const { email, password } = this.state

        return (
            <Mutation
                mutation={SIGNIN_MUTATION}
                variables={this.state}
                refethQueries={[{ query: CURRENT_USER_QUERY }]}
            >
                {(signup, { error, loading }) => (
                    <Form method='POST' onSubmit={this.handleSubmit(signup)}>
                        <fieldset disabled={loading} aria-busy={loading}>
                            <h2>Login to your account</h2>

                            {error && <div>Error: {error}</div>}

                            <label htmlFor='email'>
                                Email
                                <input
                                    type='email'
                                    name='email'
                                    placeholder='email'
                                    value={email}
                                    onChange={this.handleChange}
                                />
                            </label>

                            <label htmlFor='password'>
                                Password
                                <input
                                    type='password'
                                    name='password'
                                    placeholder='*****'
                                    value={password}
                                    onChange={this.handleChange}
                                />
                            </label>

                            <button type='submit'>Login</button>
                        </fieldset>
                    </Form>
                )}
            </Mutation>
        )
    }
}

export default Login
export { SIGNIN_MUTATION }
