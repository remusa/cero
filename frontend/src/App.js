import React from 'react'
import styled from 'styled-components'
import Footer from './components/Layout/Footer'
import Header from './components/Layout/Header'
import Router from './Router'
import 'normalize.css'

const AppStyles = styled.div`
    text-align: center;
    height: 100vh;

    display: grid;
    grid-template-rows: auto 1fr auto;
    grid-template-columns: auto minmax(1fr, auto) minmax(auto, 40px);
    grid-template-areas: 'header header header' '. main .' 'footer footer footer';
`

// if (process.env.NODE_ENV !== 'production') {
//     const { whyDidYouUpdate } = require('why-did-you-update')
//     whyDidYouUpdate(React)
// }

const App = () => (
    <AppStyles className='App'>
        <Header />
        <Router />
        <Footer />
    </AppStyles>
)

export default App
