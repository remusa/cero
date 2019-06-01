import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-boost'
// without apollo-boost
// import { ApolloClient } from 'apollo-client'
// import { InMemoryCache } from 'apollo-cache-inmemory'
// import { HttpLink } from 'apollo-link-http'
// import { ApolloLink, from } from 'apollo-link'
import { ApolloProvider } from 'react-apollo'
import { ApolloProvider as ApolloProviderHooks } from 'react-apollo-hooks'
import { BrowserRouter as Router } from 'react-router-dom'
import * as serviceWorker from './serviceWorker'
import App from './App'

import './index.scss'

import { END_POINT } from './config'

const URI = process.env.NODE_ENV === 'dev' ? END_POINT : END_POINT

// Apollo Boost
const client = new ApolloClient({
    uri: URI,
    request: async operation => {
        operation.setContext({
            fetchOptions: {
                credentials: 'include',
            },
            headers: {
                authorization: `Bearer your-personal-access-token`,
            },
        })
    },
})

// Without Apollo Boost
// const cache = new InMemoryCache()
// const httpLink = new HttpLink({ uri: URI, credentials: 'include' })
// const authMiddleware = new ApolloLink((operation, forward) => {
//     const token = localStorage.getItem('token') || null
//     operation.setContext({
//         headers: {
//             authorization: token,
//         },
//         fetchOptions: {
//             credentials: 'include',
//         },
//     })
//     return forward(operation)
// })
// const client = new ApolloClient({ link: from([authMiddleware, httpLink]), cache })

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
