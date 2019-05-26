import React, { useState, useContext, createContext } from 'react'
import styled from 'styled-components'
import 'normalize.css'
import { Router } from './Router'
import Header from './components/Header'
import Footer from './components/Footer'
import { FastsContext } from './data/DataContext'

const AppStyles = styled.div`
    text-align: center;
    height: 100vh;

    display: grid;
    grid-template-rows: auto 1fr auto;
    grid-template-columns: auto minmax(1fr, auto) auto;
    grid-template-areas: 'header header header' '. main .' 'footer footer footer';
`

function App() {
    const [fasts, setFasts] = useState([])

    return (
        <FastsContext.Provider value={fasts}>
            <AppStyles className='App'>
                <Header />
                <Router />
                <Footer />
            </AppStyles>
        </FastsContext.Provider>
    )
}

export default App
