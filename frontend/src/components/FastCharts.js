import { PropTypes } from 'prop-types'
import React from 'react'
import { Bar } from 'react-chartjs-2'
import styled from 'styled-components'
import timeConversion from '../lib/timeConversion'

const ChartStyles = styled.div`
    margin: 0 auto;
    /* width: auto; */
    /* height: auto; */

    @media all and (max-width: 800px) {
        /* width: 90%; */
        /* height: 400px; */
    }
`

function getFastData(fasts) {
    const labels = []
    const ids = []

    const chartFasts = fasts.map(fast => {
        const startDate = new Date(fast.startDate)
        const endDate = new Date(fast.endDate)
        const duration = timeConversion(startDate, endDate)
        const dayName = startDate.toString().split(' ')[0]
        const dayNumber = startDate.toString().split(' ')[2]

        labels.push(`${dayName}/${dayNumber}`)
        ids.push(fast.id)
        return Number.parseInt(duration.hours)
    })

    return [chartFasts, labels, ids]
}

const FastCharts = props => {
    const { fasts } = props
    console.log(fasts)
    const [chartFasts, labels, ids] = getFastData(fasts)

    const handleClick = e => {
        if (!e[0]) return
        const index = e[0]._index
        console.log('id: ', fasts[index].id)
    }

    const chartData = {
        labels,
        datasets: [
            {
                data: chartFasts,
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
}

FastCharts.propTypes = {
    fasts: PropTypes.array.isRequired,
}

export default FastCharts
