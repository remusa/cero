import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { withApollo } from 'react-apollo'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { SIGNOUT_MUTATION } from '../../gql/UserMutation'
import { CURRENT_USER_QUERY } from '../../gql/UserQuery'

const Logout = () => {
    const [signout] = useMutation(SIGNOUT_MUTATION, {
        refetchQueries: [{ query: CURRENT_USER_QUERY }],
        // update: cache => {
        //     cache.writeQuery({
        //         data: {},
        //     })
        // },
    })

    const handleSignOut = () => {
        signout()
        toast.error('Goodbye!', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
        })
        localStorage.clear()
        // props.client.resetStore()
    }

    return (
        <Link to='/' onClick={handleSignOut}>
            Logout
        </Link>
    )
}

export default withApollo(Logout)
