import React, { useContext } from 'react'
import { Query } from 'react-apollo'
import styled from 'styled-components'
import { FastsContext, FastsProvider } from '../data/FastsContext'
import { ALL_FASTS_QUERY } from '../gql/FastQuery'
import { CURRENT_USER_QUERY } from '../gql/UserQuery'
import Error from './ErrorMessage'
import FastCharts from './FastCharts'
import FastTimer from './FastTimer'
import PleaseSignIn from './PleaseSignIn'

const FastStyles = styled.div`
    grid-area: main;

    .fast__info {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        align-items: center;
    }

    @media all and (max-width: 500px) {
        .fast__info {
            flex-flow: column wrap;
            justify-content: center;
            align-items: center;
        }
    }
`

const FastPage = () => (
    <PleaseSignIn>
        <FastStyles>
            <h2>Fast!</h2>
            <div className='fast__info'>
                <FastsProvider>
                    <FastContainer />
                </FastsProvider>
            </div>
        </FastStyles>
    </PleaseSignIn>
)

const FastContainer = () => {
    const { setFasts, setActiveFast } = useContext(FastsContext)

    return (
        <Query query={ALL_FASTS_QUERY} refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
            {({ data, loading, error }) => {
                if (loading) return <p>Loading fasts data...</p>
                if (error) return <Error error={error} />

                const latestFast = data.fasts.filter(
                    fast => fast.endDate === null && fast.isActive === true
                )[0]

                setFasts(data.fasts)
                // setActiveFast(latestFast)

                return (
                    <>
                        <FastTimer activeFast={latestFast} />
                        <FastCharts />
                    </>
                )
            }}
        </Query>
    )
}

export default FastPage