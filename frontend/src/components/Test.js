import React from 'react'
import { Link } from 'react-router-dom'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import { CURRENT_USER_QUERY, ALL_USERS_QUERY } from '../gql/UserQuery'
import {
    SIGNIN_MUTATION,
    SIGNUP_MUTATION,
    SIGNOUT_MUTATION,
    RESET_MUTATION,
    REQUEST_RESET_MUTATION,
    UPDATE_PERMISSIONS_MUTATION,
} from '../gql/UserMutation'
import { ALL_FASTS_QUERY } from '../gql/FastQuery'
import { CREATE_FAST_MUTATION, UPDATE_FAST_MUTATION, STOP_FAST_MUTATION } from '../gql/FastMutation'

const q = gql`
    query Q {
        fasts(
            where: { user: { id: "cjvifoe55b2ct0b733fieqq3x" } }
            last: 7
            orderBy: startDate_DESC
        ) {
            id
            startDate
            endDate
            isActive
        }
    }
`

const testQuery = CURRENT_USER_QUERY
const RunQuery = () => (
    <Query query={testQuery}>
        {({ data, loading, error }) => {
            if (error) return <h2>Error: {error.message}</h2>
            if (loading) return <h2>Loading...</h2>

            console.log(data)
            return <h2>Data received</h2>
        }}
    </Query>
)

const testMutation = SIGNOUT_MUTATION
const variables = {}
const doAction = async action => {
    await action()
}
const RunMutation = () => (
    <Mutation mutation={testMutation} variables={variables}>
        {(action, { called, loading, data, error, client }) => {
            if (error) return <h2>Error: {error.message}</h2>
            if (loading) return <h2>Loading...</h2>

            doAction(action)
            console.log(data)
            return <h2>Action performed</h2>
        }}
    </Mutation>
)

const Test = () => (
    <div style={{ gridArea: 'main' }}>
        <RunQuery />
        {/* <RunMutation /> */}
        <Link to='/test'>Refetch</Link>
    </div>
)

export default Test