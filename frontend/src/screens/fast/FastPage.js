import React, { useContext } from 'react'
import { Query } from 'react-apollo'
import { useQuery } from '@apollo/react-hooks'
import styled from 'styled-components'
import nprogress from 'nprogress'
import { FastsContext, FastsProvider } from '../../data/FastsContext'
import { ALL_FASTS_QUERY } from '../../gql/FastQuery'
import { CURRENT_USER_QUERY } from '../../gql/UserQuery'
import Error from '../../components/ErrorMessage'
import FastCharts from './FastCharts'
import FastTimer from './FastTimer'
import Loading from '../../components/Loading'
import FastTable from './FastTable'

import '../../static/nprogress.css'
import { UserContext } from '../../data/UserContext'
import PleaseSignIn from './../../components/PleaseSignIn'

const FastStyles = styled.div`
    grid-area: main;

    .fast__info {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-evenly;
        align-items: center;
    }

    @media all and (max-width: 500px) {
        h1 {
            display: none;
        }

        .fast__info {
            flex-flow: column wrap;
            justify-content: center;
            align-items: center;
        }
    }
`

const InfoStyles = styled.div`
    display: flex;
    flex-flow: column wrap;
    justify-content: space-between;
    align-items: center;

    @media all and (max-width: 500px) {
        justify-content: center;
        align-items: center;
    }
`

const FastPage = props => {
    const { user } = useContext(UserContext)

    if (!user) {
        props.history.push('/enter')
    }

    return (
        <PleaseSignIn>
            <FastStyles>
                <h1>Fast!</h1>
                <div className='fast__info'>
                    <FastsProvider>
                        <FastContainer />
                    </FastsProvider>
                </div>
            </FastStyles>
        </PleaseSignIn>
    )
}

const FastContainer = () => {
    const { setActiveFast, setFasts } = useContext(FastsContext)

    const { data, loading, error } = useQuery(ALL_FASTS_QUERY, {
        refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }) // variables: { last: 7 },

    if (loading) {
        nprogress.start()
        return <Loading />
    }
    if (error) {
        nprogress.done()
        return <Error error={error} />
    }

    const latestFast = data.fasts.filter(fast => fast.endDate === null && fast.isActive === true)[0]

    setFasts(data.fasts)
    setActiveFast(latestFast)

    nprogress.done()

    return (
        <>
            <FastTimer />
            <InfoStyles>
                <FastCharts />
                <FastTable />
            </InfoStyles>
        </>
    )
}

export default FastPage
