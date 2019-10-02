import React, { createContext, useState } from 'react'

interface IContext {}

const UserContext = createContext({} as IContext)

interface Props {
    children: HTMLElement
}

const UserProvider: React.FC<Props> = ({ children }) => {
    const [user, setUser] = useState<object>({})

    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}

export { UserContext, UserProvider }
