import React from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import { CURRENT_USER_QUERY } from './User'
import Login from './Login'

const PleaseSignIn = props => (
    <Query query={CURRENT_USER_QUERY}>
        {({ data, loading }) => {
            if (loading) return <p>Loading...</p>
            if (!data.me) {
                return (
                    <div>
                        <p>Please login before continuing</p>

                        <Login />
                    </div>
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
