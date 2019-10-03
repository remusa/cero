import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { ApolloProvider as ApolloProviderHooks } from '@apollo/react-hooks'
import { BrowserRouter as Router } from 'react-router-dom'
import * as serviceWorker from './serviceWorker'
import App from './App'

require('dotenv').config({ path: '.env' })

const URI =
    process.env.NODE_ENV === 'production'
        ? process.env.REACT_APP_END_POINT
        : process.env.REACT_APP_LOCAL_HOST

const client = new ApolloClient({
    uri: URI,
    request: async operation => {
        operation.setContext({
            // headers: {
            // Authorization: `Bearer ${process.env.REACT_APP_PRISMA_TOKEN}`,
            // Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN')}` : '',
            // },
            fetchOptions: {
                credentials: 'include',
            },
        })
    },
})

ReactDOM.render(
    <Router>
        <ApolloProvider client={client}>
            <ApolloProviderHooks client={client}>
                <App />
            </ApolloProviderHooks>
        </ApolloProvider>
    </Router>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
