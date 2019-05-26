import gql from 'graphql-tag'

// last: 7
const ALL_FASTS_QUERY = gql`
    query ALL_FASTS_QUERY {
        fasts(orderBy: startDate_ASC) {
            id
            startDate
            endDate
            isActive
            duration
            createdAt
        }
    }
`

export { ALL_FASTS_QUERY }
