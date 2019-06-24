import { useMutation } from '@apollo/react-hooks'
import React from 'react'
import { Link } from 'react-router-dom'
import { SIGNOUT_MUTATION } from '../../gql/UserMutation'
import { CURRENT_USER_QUERY } from '../../gql/UserQuery'
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify'

const Logout = () => {
    const [signout] = useMutation(SIGNOUT_MUTATION, {
        refetchQueries: [{ query: CURRENT_USER_QUERY }],
    })

    const handleSignOut = () => {
        signout()
        localStorage.clear()
        toast.error('Goodbye!', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
        })
    }

    return (
        <Link to='/' onClick={handleSignOut}>
            Logout
        </Link>
    )
}

export default Logout
