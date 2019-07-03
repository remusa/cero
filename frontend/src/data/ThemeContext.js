import React, { createContext, useState, useEffect, useContext } from 'react'
import { PropTypes } from 'prop-types'
import styled, { ThemeProvider as StyledProvider, createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Lato&display=swap');

    @font-face {
        format: 'woff2';
        src: url('./static/fonts/Lato-Regular.woff2');
        font-family: 'Lato-Regular';
        font-weight: normal;
    }

    html {
        box-sizing: border-box;
        font-size: 10px;
    }

    *,
    *:before,
    *:after {
        box-sizing: inherit;
    }

    body {
        background-color: ${props => props.theme.colorBackground};
        margin: 0;
        padding: 0;
        font-family: 'Lato-Regular', 'Lato', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-size: 1.5rem;
        line-height: 2;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    h1 {
        color: ${props => props.theme.colorGreyDark};
        cursor: default;
    }

    h2 {
        color: ${props => props.theme.colorGreyDark};
        cursor: default;
    }

    button {
        cursor: pointer;
        outline: none;
    }

    a {
        text-decoration: none;
    }

    p {
        text-align: center;
    }
`

const theme = {
    colorWhiteDark: 'hsl(0, 0%, 96%)',
    colorWhite: 'hsl(0, 0%, 99%)',
    colorGreyLight: 'hsl(0, 0%, 35%)',
    colorGrey: 'hsl(0, 0%, 30%)',
    colorGreyDark: 'hsl(0, 0%, 20%)',
    colorGreyDarker: 'hsl(0, 0%, 15%)',
    colorBlack: 'hsl(0, 0%, 10%)',
    colorRed: 'hsl(0, 100%, 60%)',

    colorGreenLight: 'hsl(146, 100%, 55%)',
    colorGreenLightest: 'hsl(146, 95%, 69%)',
    colorGreen: 'hsl(146, 100%, 39%)',
    colorGreenDark: 'hsl(146, 100%, 25%)',
    colorGreenDarkest: 'hsl(146, 100%, 20%)',
    colorGreenForm: 'hsl(146, 78%, 45%)',

    // colorBackground: 'colorWhite',
    // colorFont: 'colorBlack',
    // colorPrimaryLighter: 'colorGreenLight',
    // colorPrimaryLightest: 'colorGreenLightest',
    // colorPrimary: 'colorGreen',
    // colorPrimaryDarker: 'colorGreenDark',
    // colorPrimaryDarkest: 'colorGreenDarkest',
}

const lightTheme = {
    ...theme,

    colorBackground: theme.colorWhite,
    colorFont: theme.colorBlack,

    colorPrimaryLighter: theme.colorGreenLight,
    colorPrimaryLightest: theme.colorGreenLightest,
    colorPrimary: theme.colorGreen,
    colorPrimaryDarker: theme.colorGreenDark,
    colorPrimaryDarkest: theme.colorGreenDarkest,
}

const darkTheme = {
    ...theme,

    colorBackground: theme.colorBlack,
    colorFont: theme.colorWhite,

    colorPrimaryLighter: theme.colorGreenLight,
    colorPrimaryLightest: theme.colorGreenLightest,
    colorPrimary: theme.colorGreen,
    colorPrimaryDarker: theme.colorGreenDark,
    colorPrimaryDarkest: theme.colorGreenDarkest,
}

const ThemeContext = createContext()

const ThemeProvider = ({ children }) => {
    const [currentTheme, setCurrentTheme] = useState(localStorage.getItem('theme') || 'light')

    const setDarkMode = () => {
        if (currentTheme === 'light') {
            setCurrentTheme('dark')
            localStorage.setItem('theme', 'dark')
        } else {
            setCurrentTheme('light')
            localStorage.setItem('theme', 'light')
        }
    }

    const computedTheme = currentTheme === 'light' ? lightTheme : darkTheme

    return (
        <ThemeContext.Provider value={{ theme: currentTheme, setDarkMode }}>
            <StyledProvider theme={computedTheme}>{children}</StyledProvider>
        </ThemeContext.Provider>
    )
}

ThemeProvider.propTypes = {
    children: PropTypes.element.isRequired,
}

export { ThemeContext, ThemeProvider, GlobalStyle }
