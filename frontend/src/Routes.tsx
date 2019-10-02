import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import React, { useContext } from 'react'
import { Route, Switch, __RouterContext } from 'react-router-dom'
import { animated, useTransition } from 'react-spring'
import styled from 'styled-components'
import AdminPage from './components/Admin/AdminPage'
import FastPage from './components/Fast/FastPage'
import Home from './components/Layout/Home'
import ProfilePage from './components/User/ProfilePage'
import RequestReset from './components/User/RequestReset'
import Reset from './components/User/Reset'
import SingleForm from './components/User/SingleForm'
import * as ROUTES from './constants/routes'
import './static/nprogress.css'

interface INotFound {
    location: object
}

const NotFound404 = ({ location }: INotFound) => (
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

// interface IProps {
//     props?: any
// }

// const FancyRoute: React.FC = ({props}) => {
//     useEffect(() => {
//         nprogress.start()

//         return () => {
//             nprogress.done()
//         }
//     }, [])

//     return <Route {...props} />
// }

const RouterStyles = styled.div`
    grid-area: main;

    display: flex;
    flex-flow: column wrap;
    justify-content: flex-start;
    align-items: center;

    .animated {
        grid-area: main;
    }
`

const AnimatedRoutes: React.FC = () => {
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
        <RouterStyles>
            {transitions.map(({ item, props: transition, key }) => (
                <animated.div key={key} style={transition}>
                    <Switch location={item}>
                        <FancyRoute path={ROUTES.HOME} exact component={Home} />
                        <FancyRoute path={ROUTES.FAST} component={FastPage} />
                        <FancyRoute path={ROUTES.ENTER} component={SingleForm} />
                        {/* <FancyRoute path={ROUTES.LOGIN}component={Login} />
                        <FancyRoute path={ROUTES.REGISTER} component={Register} /> */}
                        <FancyRoute path={ROUTES.PROFILE} component={ProfilePage} />
                        <FancyRoute path={ROUTES.REQUEST_RESET} component={RequestReset} />
                        <FancyRoute path={ROUTES.RESET} component={Reset} />
                        <FancyRoute path={ROUTES.FAST} component={FastPage} />
                        <FancyRoute path={ROUTES.ADMIN} component={AdminPage} />
                        <FancyRoute component={NotFound404} />
                    </Switch>
                </animated.div>
            ))}
        </RouterStyles>
    )
}

const Router: React.FC = () => (
    <Switch>
        <FancyRoute path="/" exact component={Home} />
        <FancyRoute path="/fast" component={FastPage} />
        <FancyRoute path="/enter" component={SingleForm} />
        {/* <FancyRoute path='/login' component={Login} />
        <FancyRoute path='/register' component={Register} /> */}
        <FancyRoute path="/profile" component={ProfilePage} />
        <FancyRoute path="/requestreset" component={RequestReset} />
        <FancyRoute path="/reset" component={Reset} />
        <FancyRoute path="/profile" component={FastPage} />
        <FancyRoute path="/admin" component={AdminPage} />
        <FancyRoute component={NotFound404} />
    </Switch>
)

export default Router
export { AnimatedRoutes }
