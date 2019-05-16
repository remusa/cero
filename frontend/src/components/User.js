import React from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const CURRENT_USER_QUERY = gql`
    query CURRENT_USER_QUERY {
        me {
            id
            email
            name
            permissions
            # fasts(orderBy: { field: createdAt, direction: DESC }) {
            #     startDate
            #     endDate
            #     isActive
            # }
        }
    }
`

const User = props => (
    <Query {...props} query={CURRENT_USER_QUERY}>
        {payload => props.children(payload)}
    </Query>
)

User.propTypes = {
    children: PropTypes.func.isRequired,
}

export default User
export { CURRENT_USER_QUERY }
