import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import styled from 'styled-components'
import 'normalize.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Fast from './components/Fast'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import RequestReset from './components/RequestReset'
import Reset from './components/Reset'
import PermissionsPage from './components/PermissionsPage'

const AppStyles = styled.div`
    text-align: center;
    height: 100vh;

    display: grid;
    grid-template-rows: auto 1fr auto;
    grid-template-columns: auto minmax(1fr, auto) auto;
    grid-template-areas: 'header header header' '. main .' 'footer footer footer';
`

class App extends Component {
    render() {
        return (
            <AppStyles className='App'>
                <Route path='/login' component={Login} />
                <Switch>
                    <Header />
                    <Route path='/' exact component={Home} />
                    <Route path='/fast' component={Fast} />
                    <Route path='/register' component={Register} />
                    <Route path='/requestreset' component={RequestReset} />
                    <Route path='/reset' component={Reset} />
                    <Route path='/permissions' component={PermissionsPage} />
                    {/* <Route path="/reset?resetToken=" component={Reset}/> */}
                </Switch>
                <Footer />
            </AppStyles>
        )
    }
}

export default App
