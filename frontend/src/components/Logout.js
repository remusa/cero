import React from 'react'
import { Mutation } from 'react-apollo'
import { Link } from 'react-router-dom'
import { SIGNOUT_MUTATION } from '../gql/UserMutation'
import { CURRENT_USER_QUERY } from '../gql/UserQuery'

/* localStorage.removeItem('startDate')
localStorage.removeItem('duration')
localStorage.removeItem('charts-fasts')
localStorage.removeItem('charts-labels') */

const Logout = () => (
    <Mutation mutation={SIGNOUT_MUTATION} refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
        {signout => (
            <Link to='/' onClick={signout}>
                Logout
            </Link>
        )}
    </Mutation>
)

export default Logout
