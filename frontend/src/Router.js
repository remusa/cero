import React from 'react'
import { Route, Switch } from 'react-router-dom'
import AdminPage from './components/AdminPage'
import FastPage from './components/FastPage'
import Home from './components/Home'
import Login from './components/Login'
import ProfilePage from './components/ProfilePage'
import Register from './components/Register'
import RequestReset from './components/RequestReset'
import Reset from './components/Reset'

export const NotFound404 = ({ location }) => (
    <div>
        <h3>
            404, no match for <code>{location.pathname}</code>
        </h3>
    </div>
)

export const Router = () => (
    <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/fast' component={FastPage} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/profile' component={ProfilePage} />
        <Route path='/requestreset' component={RequestReset} />
        <Route path='/reset' component={Reset} />
        <Route path='/admin' component={AdminPage} />
        {/* <Route path='/test' component={Test} /> */}
        <Route component={NotFound404} />
    </Switch>
)
