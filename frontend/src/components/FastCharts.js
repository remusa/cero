import React from 'react'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'
import styled from 'styled-components'
import Chart from 'chart.js'
import ReactChartkick, { ColumnChart } from 'react-chartkick'
import Error from './ErrorMessage'
import { CURRENT_USER_QUERY } from './User'
import timeConversion from '../lib/timeConversion'

ReactChartkick.addAdapter(Chart)

const testdata = [
    ['Sun 1', 16],
    ['Mon 2', 14],
    ['Tue 3', 3],
    ['Wed 4', 16],
    ['Thu 5', 20],
    ['Fri 6', 23],
    ['Sat 7', 12],
]

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
    const handleClick = () => {
        console.log("clicked")
    }

    return (
        <Query query={ALL_FASTS_QUERY} refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
            {({ data, loading, error }) => {
                if (loading) return <p>Loading...</p>
                if (error) return <Error error={error} />

                const latestActiveFast = data.fasts.filter(fast => fast.endDate === null && fast.isActive === true)[0]
                // TODO: set local startDate to latest fast
                const startDate = new Date(latestActiveFast.startDate)
                localStorage.setItem('startDate', startDate)
    
                const fasts = data.fasts
                    ? data.fasts.map(fast => {
                          const startDate = new Date(fast.startDate)
                          const endDate = new Date(fast.endDate)
                          const duration = timeConversion(startDate, endDate)
                          const dayName = startDate.toString().split(' ')[0]
                          const dayNumber = startDate.toString().split(' ')[2]
                          return [`${dayName}/${dayNumber}`, Number.parseInt(duration.hours)]
                      })
                    : testdata
    
                return (
                    <ChartStyles>
                        <ColumnChart
                            data={fasts}
                            max={24}
                            colors={['#00c957', '#666']}
                            stacked={false}
                            onClick={handleClick}
                        />
                    </ChartStyles>
                )
            }}
        </Query>
    )
}


export default FastCharts
export { ALL_FASTS_QUERY }
