import React from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import { CURRENT_USER_QUERY } from './User'
import Error from './ErrorMessage'
import Login from './Login'
import Main from './Main'

const PleaseSignIn = props => (
    <Query query={CURRENT_USER_QUERY}>
        {({ data, loading, error }) => {
            if (loading)
                return (
                    <Main>
                        <p>Loading...</p>
                    </Main>
                )
            else if (error)
                return (
                    <Main>
                        <Error error={error} />
                    </Main>
                )
            else if (!data.me) {
                return (
                    <Main>
                        <p>Please login before continuing</p>
                        <Login />
                    </Main>
                )
            }
            return props.children
        }}
    </Query>
)

PleaseSignIn.propTypes = {
    children: PropTypes.element.isRequired,
}

export default PleaseSignIn
