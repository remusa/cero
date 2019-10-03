import React, { createContext, useState } from 'react'

export interface IFast {
    id: string
    startDate: string
    endDate: string
    isActive: boolean
}

interface IFastsContext {
    activeFast: string
    fasts: Array<IFast>
    setFasts: React.Dispatch<React.SetStateAction<IFast[]>>
    setActiveFast: React.Dispatch<React.SetStateAction<string>>
}

const FastsContext = createContext({} as IFastsContext)

interface IProps {
    children: HTMLElement
}

const FastsProvider: React.FC<IProps> = ({ children }) => {
    const [fasts, setFasts] = useState<IFast[]>([])
    const [activeFast, setActiveFast] = useState<string>('')

    return (
        <FastsContext.Provider value={{ fasts, setFasts, activeFast, setActiveFast }}>
            {children}
        </FastsContext.Provider>
    )
}

export { FastsContext, FastsProvider }
