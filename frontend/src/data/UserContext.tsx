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
    setUser: Dispatch<SetStateAction<IUser>>
}

const UserContext = createContext({} as IUserContext)

interface Props {
    children: HTMLElement
}

const UserProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<IUser>({
        id: '',
        email: '',
        goal: 0,
        name: '',
        permissions: [],
    })

    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}

export { UserContext, UserProvider }

