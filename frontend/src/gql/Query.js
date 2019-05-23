import gql from 'graphql-tag'

// const CURRENT_USER_QUERY = gql`
//     query CURRENT_USER_QUERY {
//         me {
//             id
//             email
//             name
//             permissions
//             fasts(last: 7, orderBy: { field: createdAt, direction: DESC }) {
//                 id
//                 startDate
//                 endDate
//                 isActive
//                 duration
//             }
//         }
//     }
// `
const CURRENT_USER_QUERY = gql`
    query CURRENT_USER_QUERY {
        me {
            id
            email
            name
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

// last: 7
const ALL_FASTS_QUERY = gql`
    query ALL_FASTS_QUERY {
        fasts(orderBy: startDate_ASC) {
            id
            startDate
            endDate
            isActive
            duration
        }
    }
`

export { CURRENT_USER_QUERY, ALL_USERS_QUERY, ALL_FASTS_QUERY }
