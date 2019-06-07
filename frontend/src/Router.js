import React from 'react'
import { Route, Switch } from 'react-router-dom'
import nprogress from 'nprogress'
import AdminPage from './components/AdminPage'
import FastPage from './components/FastPage'
import Home from './components/Home'
import Login from './components/Login'
import ProfilePage from './components/ProfilePage'
import Register from './components/Register'
import RequestReset from './components/RequestReset'
import Reset from './components/Reset'

// import 'nprogress/nprogress.css'
import './static/nprogress.css'

export const NotFound404 = ({ location }) => (
    <div>
        <h3>
            404, no match for <code>{location.pathname}</code>
        </h3>
    </div>
)

export const Router = () => (
    <Switch>
        <FancyRoute path='/' exact component={Home} />
        <FancyRoute path='/fast' component={FastPage} />
        <FancyRoute path='/login' component={Login} />
        <FancyRoute path='/register' component={Register} />
        <FancyRoute path='/profile' component={ProfilePage} />
        <FancyRoute path='/requestreset' component={RequestReset} />
        <FancyRoute path='/reset' component={Reset} />
        <FancyRoute path='/admin' component={AdminPage} />
        {/* <FancyRoute  path='/test' component={Test} /> */}
        <FancyRoute component={NotFound404} />
    </Switch>
)

export class FancyRoute extends React.Component {
    componentWillMount() {
        nprogress.start()
    }

    componentDidMount() {
        nprogress.done()
    }

    render() {
        return <Route {...this.props} />
    }
}
