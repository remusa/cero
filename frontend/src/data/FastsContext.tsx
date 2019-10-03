import React, { createContext, useState } from 'react'

interface IFastsContext {
    activeFast: string
    fasts: Array<object>
    setFasts: React.Dispatch<React.SetStateAction<object[]>>
    setActiveFast: React.Dispatch<React.SetStateAction<string>>
}

const FastsContext = createContext({} as IFastsContext)

interface IProps {
    children: HTMLElement
}

const FastsProvider: React.FC<IProps> = ({ children }) => {
    const [fasts, setFasts] = useState<Array<object>>([])
    const [activeFast, setActiveFast] = useState<string>('')

    return (
        <FastsContext.Provider value={{ fasts, setFasts, activeFast, setActiveFast }}>
            {children}
        </FastsContext.Provider>
    )
}

export { FastsContext, FastsProvider }
