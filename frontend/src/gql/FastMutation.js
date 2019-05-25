import gql from 'graphql-tag'

// endDate: "2019-04-09T14:0:04.400Z"
const CREATE_FAST_MUTATION = gql`
    mutation CREATE_FAST_MUTATION {
        createFast(startDate: "2019-04-08T07:0:55.986Z", isActive: true) {
            id
            startDate
            endDate
            isActive
            duration
        }
    }
`

// endDate: "2020-05-15T23:24:52.075Z"
// duration: 20
const UPDATE_FAST_MUTATION = gql`
    mutation UPDATE_FAST_MUTATION {
        updateFast(
            id: "cjvzt6lb3a04v0b128k97vpuv"
            startDate: "2020-05-15T23:24:52.075Z"
            isActive: true
        ) {
            id
            startDate
            endDate
            isActive
            duration
        }
    }
`

const STOP_FAST_MUTATION = gql`
    mutation STOP_FAST_MUTATION {
        stopFast(id: "cjvpue99of6ve0b352mz91xbs") {
            id
            startDate
            endDate
            isActive
            duration
        }
    }
`

export { CREATE_FAST_MUTATION, UPDATE_FAST_MUTATION, STOP_FAST_MUTATION }
