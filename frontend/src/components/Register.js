import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Form from './styled/Form'
import Error from './ErrorMessage'
import Main from './Main'
import { CURRENT_USER_QUERY } from './User'

const SIGNUP_MUTATION = gql`
    mutation SIGNUP_MUTATION($email: String!, $name: String!, $password: String!) {
        signup(email: $email, name: $name, password: $password) {
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
    // confirmPassword: '',
}

// TODO: refactor to use hooks
class Register extends Component {
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

        // redirect
        const { history } = this.props
        history.push('/fast')
    }

    render() {
        const { email, name, password } = this.state

        return (
            <Mutation
                mutation={SIGNUP_MUTATION}
                variables={this.state}
                refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
                {(signup, { error, loading }) => (
                    <Main>
                        <Form
                            method="POST"
                            onSubmit={e => {
                                this.handleSubmit(e, signup)
                            }}>
                            <fieldset disabled={loading} aria-busy={loading}>
                                <h2>Register a new account</h2>

                                <Error error={error} />

                                <label htmlFor="email">
                                    Email
                                    <input
                                        required
                                        type="email"
                                        name="email"
                                        placeholder="email"
                                        value={email}
                                        onChange={this.handleChange}
                                    />
                                </label>

                                <label htmlFor="name">
                                    Name
                                    <input
                                        required
                                        type="text"
                                        name="name"
                                        placeholder="name"
                                        value={name}
                                        onChange={this.handleChange}
                                    />
                                </label>

                                <label htmlFor="password">
                                    Password
                                    <input
                                        required
                                        type="password"
                                        name="password"
                                        placeholder="*****"
                                        value={password}
                                        onChange={this.handleChange}
                                    />
                                </label>

                                {/* <label htmlFor='confirmPassword'>
                                    Confirm Password
                                    <input
                                        type='password'
                                        name='confirmPassword'
                                        placeholder='*****'
                                        value={confirmPassword}
                                        onChange={this.handleChange}
                                    />
                                </label> */}

                                <button type="submit">Register</button>

                                <div className="divider" />
                            </fieldset>
                        </Form>
                    </Main>
                )}
            </Mutation>
        )
    }
}

export default Register
export { SIGNUP_MUTATION }
