import { PropTypes } from 'prop-types'
import React, { createContext, useState } from 'react'

interface IContext {}

const FastsContext = createContext({} as IContext)

interface IProps {
    children: HTMLElement
}

const FastsProvider: React.FC<IProps> = ({ children }) => {
    const [fasts, setFasts] = useState([])
    const [activeFast, setActiveFast] = useState('')

    return (
        <FastsContext.Provider value={{ fasts, setFasts, activeFast, setActiveFast }}>
            {children}
        </FastsContext.Provider>
    )
}

FastsProvider.propTypes = {
    children: PropTypes.element.isRequired,
}

export { FastsContext, FastsProvider }
