import React, { Component } from 'react'

import { Query } from 'react-apollo'
import { gql } from "apollo-boost";

const TEST_QUERY = gql`
    query {
        dogs {
            id
            name
        }
    }
`

class Home extends Component {
    render() {
        return (
            <Query query={TEST_QUERY}>
                {({loading, error, data}) => {
                    if (loading) return <p>Loading...</p>
                    if (error) return <p>{error.message}</p>

                    console.log(data)

                    return (
                        <div>
                            <h3>Cero is an intermittent fasting timer that just works</h3>
                        </div>
                    )
                }}
            </Query>

        )
    }
}

export default Home
