import PropTypes from 'prop-types'
import React from 'react'
import { Query } from 'react-apollo'
import { CURRENT_USER_QUERY } from '../gql/UserQuery'

const User = props => (
    <Query {...props} query={CURRENT_USER_QUERY}>
        {payload => props.children(payload)}
    </Query>
)

User.propTypes = {
    children: PropTypes.func.isRequired,
}

export default User
