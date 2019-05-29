import PropTypes from 'prop-types'
import React from 'react'
import { Query } from 'react-apollo'
import { CURRENT_USER_QUERY } from '../gql/UserQuery'
import Error from './ErrorMessage'
import Login from './Login'
import Main from './Main'
import User from './User'
import Loading from './Loading'

const PleaseSignIn = props => (
    <User>
        {({ data, loading, error }) => {
            if (loading)
                return (
                    <Main>
                        <Loading />
                    </Main>
                )
            if (error)
                return (
                    <Main>
                        <Error error={error} />
                    </Main>
                )
            if (!data.me) {
                return (
                    <Main>
                        <p>Please login before continuing</p>
                        <Login />
                    </Main>
                )
            }
            return props.children
        }}
    </User>
)

PleaseSignIn.propTypes = {
    children: PropTypes.element.isRequired,
}

export default PleaseSignIn
