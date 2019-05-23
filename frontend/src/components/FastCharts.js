import React, { useState, useEffect } from 'react'
import { Query } from 'react-apollo'
import styled from 'styled-components'
import { Bar } from 'react-chartjs-2'
import Error from './ErrorMessage'
import timeConversion from '../lib/timeConversion'
import { CURRENT_USER_QUERY, ALL_FASTS_QUERY } from '../gql/Query'

const ChartStyles = styled.div`
    margin: 0 auto;
    /* width: auto; */
    /* height: auto; */

    @media all and (max-width: 800px) {
        /* width: 90%; */
        /* height: 400px; */
    }
`

const FastCharts = () => {
    const [activeFast, setActiveFast] = useState({})

    useEffect(() => {
        const startDate = new Date(activeFast.startDate)
        localStorage.setItem('startDate', startDate)
    }, [activeFast])

    const handleClick = e => {
        const data = e[0]
        console.log('CLICK: ', data)
    }

    return (
        <Query query={ALL_FASTS_QUERY} refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
            {({ data, loading, error }) => {
                if (loading) return <p>Loading...</p>
                if (error) return <Error error={error} />

                const dataActiveFast = data.fasts.filter(
                    fast => fast.endDate === null && fast.isActive === true
                )[0]
                setActiveFast(dataActiveFast)

                const labels = []
                const ids = []
                const fasts = data.fasts.map(fast => {
                    const startDate = new Date(fast.startDate)
                    const endDate = new Date(fast.endDate)
                    const duration = timeConversion(startDate, endDate)
                    const dayName = startDate.toString().split(' ')[0]
                    const dayNumber = startDate.toString().split(' ')[2]
                    labels.push(`${dayName}/${dayNumber}`)
                    ids.push(fast.id)
                    return Number.parseInt(duration.hours)
                })

                const chartData = {
                    labels,
                    datasets: [
                        {
                            data: fasts,
                            label: 'Fast',
                            backgroundColor: '#17ff7b',
                            borderColor: '#00c957',
                            borderWidth: 1,
                            hoverBackgroundColor: '#00c957',
                            hoverBorderColor: '#007d36',
                        },
                    ],
                }

                return (
                    <ChartStyles>
                        <Bar
                            data={chartData}
                            options={{}}
                            max={24}
                            stacked={false}
                            getElementAtEvent={elems => handleClick(elems)}
                        />
                    </ChartStyles>
                )
            }}
        </Query>
    )
}

export default FastCharts
