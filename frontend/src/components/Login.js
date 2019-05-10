import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Mutation } from 'react-apollo'
import styled from 'styled-components'
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

const ResetStyles = styled.div`
    padding: 4px;
    margin-top: 8px;
    font-size: 1.3rem;
    color: var(--color-grey);

    &:active {
        color: var(--color-grey);
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
                refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
                {(signup, { error, loading }) => (
                    <Main>
                        <Form
                            method="POST"
                            onSubmit={e => {
                                this.handleSubmit(e, signup)
                            }}>
                            <fieldset disabled={loading} aria-busy={loading}>
                                <h2>Login to your account</h2>

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

                                <button type="submit">Login</button>

                                <Link to="/requestreset">
                                    <ResetStyles>Reset password</ResetStyles>
                                </Link>
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
