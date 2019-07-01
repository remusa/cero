import React from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { toast } from 'react-toastify'
import { SIGNOUT_MUTATION } from '../../gql/UserMutation'
import { CURRENT_USER_QUERY } from '../../gql/UserQuery'
import 'react-toastify/dist/ReactToastify.css'

const Logout = () => {
    const [signout] = useMutation(SIGNOUT_MUTATION, {
        refetchQueries: [{ query: CURRENT_USER_QUERY }],
    })

    const handleSignOut = () => {
        localStorage.clear()
        toast.error('Goodbye!', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
        })
        signout()
    }

    return (
        <Link to='/' onClick={handleSignOut}>
            Logout
        </Link>
    )
}

export default Logout
