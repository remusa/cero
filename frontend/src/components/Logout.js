import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { CURRENT_USER_QUERY } from './User'

const SIGNOUT_MUTATION = gql`
    mutation SIGNOUT_MUTATION {
        signout {
            message
        }
    }
`

const Logout = () => (
    <Mutation mutation={SIGNOUT_MUTATION} refethQueries={[{ query: CURRENT_USER_QUERY }]}>
        {signout => (
            <button type='button' onClick={signout}>
                Logout
            </button>
        )}
        }
    </Mutation>
)

export default Logout
export { SIGNOUT_MUTATION }
