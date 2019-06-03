import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { ApolloProvider as ApolloProviderHooks } from 'react-apollo-hooks'
import { BrowserRouter as Router } from 'react-router-dom'
import * as serviceWorker from './serviceWorker'
import App from './App'

import './index.scss'

require('dotenv').config({ path: '.env' })

const LOCAL_HOST = "http://localhost:4444/"
const URI = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_END_POINT : LOCAL_HOST

const client = new ApolloClient({
    uri: URI,
    request: async operation => {
        operation.setContext({
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_PRISMA_TOKEN}`,
            },
            fetchOptions: {
                credentials: 'include',
            },
        })
    },
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <ApolloProviderHooks client={client}>
            <Router>
                <App />
            </Router>
        </ApolloProviderHooks>
    </ApolloProvider>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
