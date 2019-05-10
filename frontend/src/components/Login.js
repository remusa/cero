import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Form from './styled/Form'
import Error from './ErrorMessage'
import Main from './Main'
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

        // refetchQueries={[{ query: CURRENT_USER_QUERY }]}

        return (
            <Mutation
                mutation={SIGNIN_MUTATION}
                variables={this.state}
            >
                {(signup, { error, loading }) => (
                    <Main>
                        <Form styles={{gridArea: 'main'}} method='POST' onSubmit={(e) => {this.handleSubmit(e, signup)}}>
                            <fieldset disabled={loading} aria-busy={loading}>
                                <h2>Login to your account</h2>

                                <Error error={error} />

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

                                <label htmlFor='password'>
                                    Password
                                    <input
                                        required
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
                    </Main>
                )}
            </Mutation>
        )
    }
}

export default Login
export { SIGNIN_MUTATION }
