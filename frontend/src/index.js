import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import App from './App'
import './index.scss'
import * as serviceWorker from './serviceWorker'

const apollo = new ApolloClient({
    uri: 'https://48p1r2roz4.sse.codesandbox.io',
})

ReactDOM.render(
    <ApolloProvider client={apollo}>
        <Router>
            <App />
        </Router>
    </ApolloProvider>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
