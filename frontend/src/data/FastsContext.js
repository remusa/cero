import React, { createContext, useState } from 'react'
import { PropTypes } from 'prop-types'

export const FastsContext = createContext()

export const FastsProvider = ({ children }) => {
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
