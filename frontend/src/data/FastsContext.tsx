import React, { createContext, useState } from 'react'

interface IContext {}

const FastsContext = createContext({} as IContext)

interface IProps {
    children: HTMLElement
}

const FastsProvider: React.FC<IProps> = ({ children }) => {
    const [fasts, setFasts] = useState<Array<any>>([])
    const [activeFast, setActiveFast] = useState<string>('')

    return (
        <FastsContext.Provider value={{ fasts, setFasts, activeFast, setActiveFast }}>
            {children}
        </FastsContext.Provider>
    )
}

export { FastsContext, FastsProvider }
