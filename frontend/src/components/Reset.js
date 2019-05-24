import React, { Component } from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { Mutation } from 'react-apollo'

import Form from './styled/Form'
import Error from './ErrorMessage'
import Main from './Main'

import { CURRENT_USER_QUERY } from '../gql/UserQuery'
import { RESET_MUTATION } from '../gql/UserMutation'

const initialState = {
    password: '',
    confirmPassword: '',
}

// TODO: refactor to use hooks
class Reset extends Component {
    static propTypes = {
        // resetToken: PropTypes.string.isRequired,
        location: PropTypes.object.isRequired,
    }

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

        const { history } = this.props
        history.push('/fast')
    }

    render() {
        const search = queryString.parse(this.props.location.search)
        const { resetToken } = search
        const { password, confirmPassword, formError } = this.state
        console.log('resetToken: ', resetToken)

        return (
            <Mutation
                mutation={RESET_MUTATION}
                variables={{ resetToken, password, confirmPassword }}
                refetchQueries={[{ query: CURRENT_USER_QUERY }]}
            >
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
                                {formError && <p>{formError}</p>}
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
                                <label htmlFor='confirmPassword'>
                                    Confirm Password
                                    <input
                                        required
                                        type='password'
                                        name='confirmPassword'
                                        placeholder='*****'
                                        value={confirmPassword}
                                        onChange={this.handleChange}
                                    />
                                </label>
                                <button type='submit'>Reset password</button>
                            </fieldset>
                        </Form>
                    </Main>
                )}
            </Mutation>
        )
    }
}

export default Reset
