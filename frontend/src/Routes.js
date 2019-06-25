import React, { useContext } from 'react'
import { Switch, Route, __RouterContext } from 'react-router-dom'
import { animated, useTransition, config } from 'react-spring'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import AdminPage from './components/Admin/AdminPage'
import FastPage from './components/Fast/FastPage'
import Home from './components/Layout/Home'
import Login from './components/User/Login'
import ProfilePage from './components/User/ProfilePage'
import Register from './components/User/Register'
import RequestReset from './components/User/RequestReset'
import Reset from './components/User/Reset'
import './static/nprogress.css'
import styled from 'styled-components'
import Main from './components/Layout/Main'

const NotFound404 = ({ location }) => (
    <div>
        <h3>
            404, no match for <code>{location.pathname}</code>
        </h3>
    </div>
)

class FancyRoute extends React.Component {
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

const RouterStyles = styled.div`
    .animated {
        grid-area: main;
    }
`

const AnimatedRoutes = () => {
    const { location } = useContext(__RouterContext)
    const transitions = useTransition(location, location => location.key, {
        // from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
        // enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
        // leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
        from: {
            opacity: 0,
            position: 'absolute',
            width: '100%',
            transform: 'translate3d(100%,0,0)',
        },
        enter: { opacity: 1, transform: 'translate3d(0,0,0)' },
        leave: { opacity: 0, transform: 'translate3d(0,100%,0)' },
        // config: config.molasses,
    })

    return (
        <Main>
            {transitions.map(({ item, props: transition, key }) => (
                <animated.div key={key} style={transition}>
                    <Switch location={item}>
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
                </animated.div>
            ))}
        </Main>
    )
}

const Router = () => (
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
)

export default Router
export { AnimatedRoutes }
