import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { SIGNIN_MUTATION } from '../gql/UserMutation'
import { CURRENT_USER_QUERY } from '../gql/UserQuery'
import Error from './ErrorMessage'
import Main from './Main'
import Form from './styled/Form'

export const ResetStyles = styled.div`
    padding: 4px;
    margin-top: 8px;
    font-size: 1.3rem;
    color: var(--color-grey);
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }

    &:active {
        color: var(--color-grey);
    }
`

const initialState = {
    name: '',
    email: '',
    password: '',
}

// TODO: refactor to use hooks
class Login extends Component {
    state = initialState

    handleChange = e => {
        const { name, value } = e.target
        this.setState({
            [name]: value,
        })
    }

    handleSubmit = async (e, signin) => {
        e.preventDefault()
        await signin()
        this.setState = initialState
    }

    render() {
        const { email, password } = this.state

        return (
            <Mutation
                mutation={SIGNIN_MUTATION}
                variables={this.state}
                refetchQueries={[{ query: CURRENT_USER_QUERY }]}
                onCompleted={() => this.props.history.push('/fast')}
            >
                {(signin, { error, loading }) => (
                    <Main>
                        <Form
                            method='POST'
                            onSubmit={e => {
                                this.handleSubmit(e, signin)
                            }}
                        >
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

                                <Link to='/requestreset'>
                                    <ResetStyles>Reset password</ResetStyles>
                                </Link>

                                <div className='divider' />
                            </fieldset>
                        </Form>
                    </Main>
                )}
            </Mutation>
        )
    }
}

export default Login
