import React, { useContext } from 'react'
import gql from 'graphql-tag'
import { Mutation, Query } from 'react-apollo'
import { Link } from 'react-router-dom'
import { SIGNOUT_MUTATION } from '../gql/UserMutation'
import { CURRENT_USER_QUERY } from '../gql/UserQuery'
import {FastsContext} from '../data/FastsContext'

const TEST_QUERY = gql`
    query me {
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
`

const RunQuery = () => (
    <Query query={TEST_QUERY}>
        {({ data, loading, error }) => {
            if (error) return <h2>Error: {error.message}</h2>
            if (loading) return <h2>Loading...</h2>

            console.log('RunQuery: ', data)
            return <h2>Data received</h2>
        }}
    </Query>
)
const doAction = async action => {
    await action()
}
const RunMutation = () => (
    <Mutation mutation={SIGNOUT_MUTATION} variables={{}}>
        {(action, { called, loading, data, error, client }) => {
            if (error) return <h2>Error: {error.message}</h2>
            if (loading) return <h2>Loading...</h2>

            doAction(action)
            console.log(data)
            return <h2>Action performed</h2>
        }}
    </Mutation>
)

const Test = () => {
    const fasts = useContext(FastsContext)
    console.log('fasts: ', fasts)

    return (
        <div style={{ gridArea: 'main' }}>
            <RunQuery />
            {/* <RunMutation /> */}
            <Link to='/test'>Refetch</Link>
        </div>
    )
}

export default Test
