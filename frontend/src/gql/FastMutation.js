import gql from 'graphql-tag'

const CREATE_FAST_MUTATION = gql`
    mutation CREATE_FAST_MUTATION($startDate: DateTime!, $endDate: DateTime, $isActive: Boolean) {
        createFast(startDate: $startDate, endDate: $endDate, isActive: $isActive) {
            id
            startDate
            endDate
            isActive
            duration
        }
    }
`

const STOP_FAST_MUTATION = gql`
    mutation STOP_FAST_MUTATION($id: ID!) {
        stopFast(id: $id) {
            id
            startDate
            endDate
            isActive
            duration
        }
    }
`

const UPDATE_FAST_MUTATION = gql`
    mutation UPDATE_FAST_MUTATION(
        $id: ID!
        $startDate: DateTime
        $endDate: DateTime
        $duration: Int
        $isActive: Boolean
    ) {
        updateFast(
            id: $id
            startDate: $startDate
            endDate: $endDate
            duration: $duration
            isActive: $isActive
        ) {
            id
            startDate
            endDate
            isActive
            duration
        }
    }
`

const DELETE_FAST_MUTATION = gql`
    mutation DELETE_FAST_MUTATION($id: ID!) {
        deleteFast(id: $id) {
            id
            startDate
            endDate
            isActive
            duration
        }
    }
`

export { CREATE_FAST_MUTATION, UPDATE_FAST_MUTATION, STOP_FAST_MUTATION, DELETE_FAST_MUTATION }
