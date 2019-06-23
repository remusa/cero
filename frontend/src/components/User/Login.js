import React, { useState } from 'react'
import { Mutation } from 'react-apollo'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useMutation } from '@apollo/react-hooks'
import { SIGNIN_MUTATION } from '../../gql/UserMutation'
import { CURRENT_USER_QUERY } from '../../gql/UserQuery'
import Error from '../ErrorMessage'
import Main from '../Layout/Main'
import Form from '../styled/Form'

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

const Login = props => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const resetState = () => {
        setEmail('')
        setPassword('')
    }

    const handleChange = e => {
        const { name, value } = e.target
        if (name === 'email') setEmail(value)
        else if (name === 'password') setPassword(value)
    }

    const handleSubmit = async (e, action) => {
        e.preventDefault()
        await action().then(resetState())
    }

    const [signin, { error, loading }] = useMutation(SIGNIN_MUTATION, {
        variables: { email, password },
        refetchQueries: [{ query: CURRENT_USER_QUERY }],
        onCompleted: () => props.history.push('/fast'),
    })

    return (
        <Main>
            <Form
                method='POST'
                onSubmit={e => {
                    handleSubmit(e, signin)
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
                            onChange={handleChange}
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
                            onChange={handleChange}
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
    )
}

export default Login
