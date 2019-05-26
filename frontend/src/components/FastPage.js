import React, { useEffect, useState } from 'react'
import { Query } from 'react-apollo'
import styled from 'styled-components'
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

const FastContainer = () => {
    const [activeFast, setActiveFast] = useState('')
    const [fasts, setFasts] = useState([])

    // useEffect(() => {
    //     const startDate = new Date(activeFast.startDate)
    //     localStorage.setItem('startDate', startDate)
    // }, [activeFast])

    // useEffect(() => {
    //     localStorage.setItem('fasts', fasts)
    // }, [fasts])

    return (
        <Query query={ALL_FASTS_QUERY} refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
            {({ data, loading, error }) => {
                if (loading) return <p>Loading fasts...</p>
                if (error) return <Error error={error} />

                const latestFast = data.fasts.filter(
                    fast => fast.endDate === null && fast.isActive === true
                )[0]
                setActiveFast(latestFast)
                setFasts(data.fasts)

                return (
                    <>
                        <FastTimer activeFast={latestFast} />
                        <FastCharts fasts={data.fasts} />
                    </>
                )
            }}
        </Query>
    )
}

const FastPage = () => (
    <PleaseSignIn>
        <FastStyles>
            <h2>Fast!</h2>
            <div className='fast__info'>
                <FastContainer />
            </div>
        </FastStyles>
    </PleaseSignIn>
)

export default FastPage
