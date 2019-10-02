import React, { createContext, useState } from 'react'
import { PropTypes } from 'prop-types'

interface IContext {}

const UserContext = createContext({} as IContext)

interface Props {
    children?: any
}

const UserProvider: React.FC<Props> = ({ children }) => {
    const [user, setUser] = useState<object>({})

    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}

UserProvider.propTypes = {
    children: PropTypes.element.isRequired,
}

export { UserContext, UserProvider }
