import 'normalize.css'
import React from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import styled from 'styled-components'
import Footer from './components/Footer'
import Header from './components/Header'
import { ThemeProvider } from './data/ThemeContext'
import { UserProvider } from './data/UserContext'
import Routes from './Router'

const AppStyles = styled.div`
    text-align: center;
    height: 100vh;

    display: grid;
    grid-template-rows: auto 1fr auto;
    grid-template-columns: auto minmax(1fr, auto) minmax(auto, 40px);
    grid-template-areas: 'header header header' '. main .' 'footer footer footer';
`

toast.configure({
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    newestOnTop: true,
    closeOnClick: true,
    rtl: false,
    // pauseOnVisibilityChange: false,
    draggable: false,
    pauseOnHover: false,
})

const App: React.FC = () => (
    <ThemeProvider>
        <UserProvider>
            <AppStyles className="App">
                <Header />

                <Routes />
                {/* <AnimatedRoutes /> */}

                <Footer />
            </AppStyles>
        </UserProvider>
    </ThemeProvider>
)

export default App
