import React from 'react'
import { Route, Switch } from 'react-router-dom'
import nprogress from 'nprogress'
import AdminPage from './components/Admin/AdminPage'
import FastPage from './components/Fast/FastPage'
import Home from './components/Layout/Home'
import Login from './components/User/Login'
import ProfilePage from './components/User/ProfilePage'
import Register from './components/User/Register'
import RequestReset from './components/User/RequestReset'
import Reset from './components/User/Reset'

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
        <FancyRoute component={NotFound404} />
        {/* <FancyRoute  path='/test' component={Test} /> */}
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
