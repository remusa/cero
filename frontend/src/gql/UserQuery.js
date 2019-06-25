import gql from 'graphql-tag'

const CURRENT_USER_QUERY = gql`
    query CURRENT_USER_QUERY {
        me {
            id
            email
            name
            goal
            permissions
            fasts {
                id
                startDate
                endDate
                isActive
                duration
            }
        }
    }
`

const ALL_USERS_QUERY = gql`
    query ALL_USERS_QUERY {
        users {
            id
            name
            email
            permissions
        }
    }
`

export { CURRENT_USER_QUERY, ALL_USERS_QUERY }
