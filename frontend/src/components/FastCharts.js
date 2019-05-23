import React from 'react'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'
import styled from 'styled-components'
import { Bar } from 'react-chartjs-2';
import Error from './ErrorMessage'
import { CURRENT_USER_QUERY } from './User'
import timeConversion from '../lib/timeConversion'

const ALL_FASTS_QUERY = gql`
    query ALL_FASTS_QUERY {
        fasts(last: 7, orderBy: startDate_ASC) {
            id
            startDate
            endDate
            isActive
            duration
        }
    }
`

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
    const handleClick = (e) => {
        const data = e
        console.log('CLICK: ', data)
    }

    return (
        <Query query={ALL_FASTS_QUERY} refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
            {({ data, loading, error }) => {
                if (loading) return <p>Loading...</p>
                if (error) return <Error error={error} />

                const latestActiveFast = data.fasts.filter(
                    fast => fast.endDate === null && fast.isActive === true
                )[0]
                // TODO: set local startDate to latest fast
                const startDateLatest = new Date(latestActiveFast.startDate)
                localStorage.setItem('startDateLatest', startDateLatest)

                {/* const fasts = data.fasts
                    ? data.fasts.map(fast => {
                          const startDate = new Date(fast.startDate)
                          const endDate = new Date(fast.endDate)
                          const duration = timeConversion(startDate, endDate)
                          const dayName = startDate.toString().split(' ')[0]
                          const dayNumber = startDate.toString().split(' ')[2]
                          return [`${dayName}/${dayNumber}`, Number.parseInt(duration.hours)]
                      })
                    : testdata */}

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
                    datasets: [{
                        data: fasts,
                        label: 'Fast',
                        backgroundColor: '#17ff7b',
                        borderColor: '#00c957',
                        borderWidth: 1,
                        hoverBackgroundColor: '#00c957',
                        hoverBorderColor: '#007d36',
                    }]
                }

                const chartOptions = {}

                return (
                    <ChartStyles>
                        <Bar
                            data={chartData}
                            options={chartOptions}
                            max={24}
                            colors={['#00c957', '#666']}
                            stacked={false}
                            getElementAtEvent={handleClick}
                        />
                    </ChartStyles>
                )
            }}
        </Query>
    )
}

export default FastCharts
export { ALL_FASTS_QUERY }
