import React from 'react'
import { Link } from 'react-router-dom'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { CURRENT_USER_QUERY } from '../gql/Query'
import { SIGNOUT_MUTATION } from '../gql/Mutation'

const Logout = () => (
    <Mutation mutation={SIGNOUT_MUTATION} refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
        {signout => {
            return (
                <Link to="/" onClick={signout}>
                    Logout
                </Link>
            )
        }}
    </Mutation>
)

export default Logout
