import { useMutation } from '@apollo/react-hooks'
import React from 'react'
import { Link } from 'react-router-dom'
import { SIGNOUT_MUTATION } from '../../gql/UserMutation'
import { CURRENT_USER_QUERY } from '../../gql/UserQuery'

const Logout = () => {
    const [signout] = useMutation(SIGNOUT_MUTATION, {
        refetchQueries: [{ query: CURRENT_USER_QUERY }],
    })

    const handleSignOut = () => {
        signout()
        localStorage.clear()
    }

    return (
        <Link to='/' onClick={handleSignOut}>
            Logout
        </Link>
    )
}

export default Logout
