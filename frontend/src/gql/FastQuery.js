import gql from 'graphql-tag'

const ALL_FASTS_QUERY = gql`
    query ALL_FASTS_QUERY($last: Int) {
        fasts(orderBy: startDate_ASC, last: $last) {
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
