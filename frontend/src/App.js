import 'normalize.css'
import React, { Component } from 'react'
import { Switch } from 'react-router-dom'
import styled from 'styled-components'
import AdminPage from './components/AdminPage'
import FastPage from './components/FastPage'
import Footer from './components/Footer'
import Header from './components/Header'
import Home from './components/Home'
import Login from './components/Login'
import ProfilePage from './components/ProfilePage'
import Register from './components/Register'
import RequestReset from './components/RequestReset'
import Reset from './components/Reset'
import { FancyRoute, NotFound404 } from './Router'

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

class App extends Component {
    render() {
        return (
            <AppStyles className='App'>
                <Header />

                {/* <Router /> */}

                <Switch>
                    <FancyRoute path='/' exact component={Home} />
                    <FancyRoute path='/fast' component={FastPage} />
                    <FancyRoute path='/login' component={Login} />
                    <FancyRoute path='/register' component={Register} />
                    <FancyRoute path='/profile' component={ProfilePage} />
                    <FancyRoute path='/requestreset' component={RequestReset} />
                    <FancyRoute path='/reset' component={Reset} />
                    <FancyRoute path='/admin' component={AdminPage} />
                    <FancyRoute component={NotFound404} />
                </Switch>

                <Footer />
            </AppStyles>
        )
    }
}

export default App
