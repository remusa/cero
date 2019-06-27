import React, { createContext, useState, useEffect, useContext } from 'react'
import { PropTypes } from 'prop-types'
import { ThemeProvider as StyledProvider } from 'styled-components'

// const lightTheme = { backgroundColor: 'var(--color-white)' }

// const darkTheme = {  backgroundColor: 'var(--color-black)' }

const ThemeContext = createContext()

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')

    const setDarkMode = () => {
        if (theme === 'light') {
            setTheme('dark')
            localStorage.setItem('theme', 'dark')
        } else {
            setTheme('light')
            localStorage.setItem('theme', 'light')
        }
    }

    return <ThemeContext.Provider value={{ theme, setDarkMode }}>{children}</ThemeContext.Provider>
}

ThemeProvider.propTypes = {
    children: PropTypes.element.isRequired,
}

export { ThemeContext, ThemeProvider }
