import React, { Component } from 'react'
import styled from 'styled-components'
import 'normalize.css'
import { Router } from './Router'
import Header from './components/Header'
import Footer from './components/Footer'

const AppStyles = styled.div`
    text-align: center;
    height: 100vh;

    display: grid;
    grid-template-rows: auto 1fr auto;
    grid-template-columns: auto minmax(1fr, auto) auto;
    grid-template-areas: 'header header header' '. main .' 'footer footer footer';
`

// if (process.env.NODE_ENV !== 'production') {
//     const { whyDidYouUpdate } = require('why-did-you-update')
//     whyDidYouUpdate(React)
// }

class App extends Component {
    render() {
        return (
            <AppStyles className='App'>
                <Header />
                <Router />
                <Footer />
            </AppStyles>
        )
    }
}

export default App
