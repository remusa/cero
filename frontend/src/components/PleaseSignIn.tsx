import { useQuery } from '@apollo/react-hooks'
import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import { UserContext } from '../data/UserContext'
import { CURRENT_USER_QUERY } from '../gql/UserQuery'
import Login from '../screens/auth/Login'
import Error from './ErrorMessage'
import Main from './Main'

interface IProps {
    children: React.ReactNode
}

const PleaseSignIn: React.FC<IProps> = ({ children }) => {
    const { setUser } = useContext(UserContext)

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

    return children
}

PleaseSignIn.propTypes = {
    children: PropTypes.element.isRequired,
}

export default PleaseSignIn
