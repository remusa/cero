import gql from 'graphql-tag'
import React from 'react'
import { Mutation, Query } from 'react-apollo'
import { Link } from 'react-router-dom'
import { SIGNOUT_MUTATION } from '../gql/UserMutation'
import { CURRENT_USER_QUERY } from '../gql/UserQuery'

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
