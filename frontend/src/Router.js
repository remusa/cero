import React from 'react'
import { Switch, Route } from 'react-router-dom'
import FastPage from './components/FastPage'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import ProfilePage from './components/ProfilePage'
import RequestReset from './components/RequestReset'
import Reset from './components/Reset'
import PermissionsPage from './components/PermissionsPage'
import Test from './components/Test'

export const Router = () => (
    <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/fast' component={FastPage} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/profile' component={ProfilePage} />
        <Route path='/requestreset' component={RequestReset} />
        <Route path='/reset' component={Reset} />
        <Route path='/permissions' component={PermissionsPage} />
        <Route path='/test' component={Test} />
    </Switch>
)
