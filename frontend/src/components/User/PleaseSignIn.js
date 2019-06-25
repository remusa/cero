import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { useQuery } from '@apollo/react-hooks'
import Error from '../ErrorMessage'
import Main from '../Layout/Main'
import Login from './Login'
import User from './User'
import { UserContext } from '../../data/UserContext'
import Loading from '../Loading'
import { CURRENT_USER_QUERY } from '../../gql/UserQuery'

const PleaseSignIn = props => {
    const { user, setUser } = useContext(UserContext)

    const { data, loading, error } = useQuery(CURRENT_USER_QUERY)

    if (loading) {
        return <Main>{/* <Loading /> */}</Main>
    }

    if (error) {
        return (
            <Main>
                <Error error={error} />
            </Main>
        )
    }

    if (!data.me) {
        return (
            <Main>
                {/* <p>Please login before continuing</p> */}
                <Login />
            </Main>
        )
    }

    setUser(data.me)

    return props.children
}

PleaseSignIn.propTypes = {
    children: PropTypes.element.isRequired,
}

export default PleaseSignIn
