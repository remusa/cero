import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { toast } from 'react-toastify'
import { SIGNUP_MUTATION } from '../../gql/UserMutation'
import { CURRENT_USER_QUERY } from '../../gql/UserQuery'
import Error from '../ErrorMessage'
import Main from '../Layout/Main'
import Form from '../styled/Form'

const Register = props => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const resetState = () => {
        setEmail('')
        setUsername('')
        setPassword('')
    }

    const handleChange = e => {
        const { name, value } = e.target
        if (name === 'email') setEmail(value)
        else if (name === 'username') setUsername(value)
        else if (name === 'password') setPassword(value)
    }

    const handleSubmit = async (e, action) => {
        e.preventDefault()
        await action()
        await resetState()
        await toast.success('Welcome!', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
        })
    }

    const [signup, { error, loading }] = useMutation(SIGNUP_MUTATION, {
        variables: { email, name: username, password },
        refetchQueries: [{ query: CURRENT_USER_QUERY }],
        onCompleted: () => props.history.push('/fast'),
    })

    return (
        <Main>
            <Form
                method='POST'
                onSubmit={e => {
                    handleSubmit(e, signup)
                }}
            >
                <fieldset disabled={loading} aria-busy={loading}>
                    <h2>Register a new account</h2>

                    <Error error={error} />

                    <label htmlFor='username'>
                        Username
                        <input
                            required
                            type='text'
                            name='username'
                            placeholder='username'
                            value={username}
                            onChange={handleChange}
                        />
                    </label>

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

                    <button type='submit'>Register</button>

                    <div className='divider' />
                </fieldset>
            </Form>
        </Main>
    )
}

export default Register
