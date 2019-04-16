import React, { Component } from 'react'
import Form from './Form'

const initialState = {
    email: '',
    name: '',
    password: '',
}

class Register extends Component {
    state = initialState

    handleChange = e => {
        const { name, value } = e.target

        this.setState({
            [name]: value,
        })
    }

    handleSubmit = e => {
        e.preventDefault()

        // const res = await signup()

        this.setState = initialState
    }

    render() {
        const { email, name, password } = this.state

        return (
            <Form method='POST' onSubmit={this.handleSubmit}>
                <fieldset>
                    <h2>Register new account</h2>

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

                    <label htmlFor='name'>
                        Name
                        <input
                            type='text'
                            name='name'
                            placeholder='name'
                            value={name}
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

                    <label htmlFor='password'>
                        Confirm Password
                        <input
                            type='password'
                            name='password'
                            placeholder='*****'
                            value={password}
                            onChange={this.handleChange}
                        />
                    </label>

                    <button type='submit'>Register</button>
                </fieldset>
            </Form>
        )
    }
}

export default Register
