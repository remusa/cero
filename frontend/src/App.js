import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { toast } from 'react-toastify'
import Footer from './components/Layout/Footer'
import Header from './components/Layout/Header'
import Routes, { AnimatedRoutes } from './Routes'
import 'normalize.css'
import 'react-toastify/dist/ReactToastify.css'
import { UserProvider } from './data/UserContext'
import { ThemeProvider } from './data/ThemeContext'

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

toast.configure({
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    newestOnTop: true,
    closeOnClick: true,
    rtl: false,
    pauseOnVisibilityChange: false,
    draggable: false,
    pauseOnHover: false,
})

const App = () => (
    <ThemeProvider>
        <UserProvider>
            <AppStyles className='App'>
                <Header />
                <Routes />
                {/* <AnimatedRoutes /> */}
                <Footer />
            </AppStyles>
        </UserProvider>
    </ThemeProvider>
)

export default App
