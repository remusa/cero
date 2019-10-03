import { useMutation } from '@apollo/react-hooks'
import React from 'react'
import { withApollo } from 'react-apollo'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import styled from 'styled-components'
import { SIGNOUT_MUTATION } from '../../gql/UserMutation'
import { CURRENT_USER_QUERY } from '../../gql/UserQuery'

const SpanStyles = styled.span`
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
`

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
            position: 'bottom-right',
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
        // <SpanStyles>
        <Link to="/" onClick={handleSignOut}>
            {/* <img height='16' width='16' src={logoutIcon} />  */}
            Logout
        </Link>
        // </SpanStyles>
    )
}

export default withApollo(Logout)
