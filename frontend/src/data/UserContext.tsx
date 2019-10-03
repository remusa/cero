import React, { createContext, Dispatch, SetStateAction, useState } from 'react'

interface IUser {
    id: string
    email: string
    goal: number
    name: string
    permissions: string[]
}

interface IUserContext {
    user: IUser
    setUser: Dispatch<SetStateAction<object>>
}

const UserContext = createContext({} as IUserContext)

interface Props {
    children: HTMLElement
}

const UserProvider: React.FC<Props> = ({ children }) => {
    const [user, setUser] = useState<IUser>({})

    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}

export { UserContext, UserProvider }
