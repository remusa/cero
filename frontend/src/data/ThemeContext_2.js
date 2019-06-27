import React, { createContext, useState, useContext, useEffect } from 'react'
import { PropTypes } from 'prop-types'
import styled from 'styled-components'

const LightTheme = ''

const DarkTheme = ''

// const defaultContextData = {
//     dark: false,
//     toggle: () => {},
// }

// const ThemeContext = createContext(defaultContextData)
const ThemeContext = createContext('dark')
const useTheme = () => useContext(ThemeContext)

// const useEffectDarkMode = () => {
//     const [theme, setTheme] = useState({
//         dark: false,
//         hasThemeLoaded: false,
//     })

//     /* eslint-disable */
//     useEffect(() => {
//         const isDark = localStorage.getItem('dark') === 'true'
//         setTheme({ ...theme, dark: isDark, hasThemeLoaded: true })
//     }, [])
//     /* eslint-enable */

//     return [theme, setTheme]
// }

const ThemeProvider = ({ children }) => {
    // const [theme, setTheme] = useEffectDarkMode()
    const [theme, setTheme] = useContext(ThemeContext)

    if (!theme.hasThemeLoaded) {
        //
        return <div />
    }
    const toggle = () => {
        const dark = !theme.dark
        localStorage.setItem('dark', JSON.stringify(dark))
        setTheme({ ...theme, dark })
    }

    return (
        <ThemeContext.Provider value={{ dark: theme.dark, toggle }}>
            {children}
        </ThemeContext.Provider>
    )
}

ThemeProvider.propTypes = {
    children: PropTypes.element.isRequired,
}

export { ThemeProvider, useTheme }
