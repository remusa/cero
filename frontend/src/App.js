import 'normalize.css'
import React, { Component } from 'react'
import { Switch } from 'react-router-dom'
import styled from 'styled-components'
import AdminPage from './components/Admin/AdminPage'
import FastPage from './components/Fast/FastPage'
import Footer from './components/Layout/Footer'
import Header from './components/Layout/Header'
import Home from './components/Layout/Home'
import Login from './components/User/Login'
import ProfilePage from './components/User/ProfilePage'
import Register from './components/User/Register'
import RequestReset from './components/User/RequestReset'
import Reset from './components/User/Reset'
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
                    <FancyRoute path='/profile' component={FastPage} />
                    <FancyRoute path='/admin' component={AdminPage} />
                    <FancyRoute component={NotFound404} />
                </Switch>

                <Footer />
            </AppStyles>
        )
    }
}

export default App
