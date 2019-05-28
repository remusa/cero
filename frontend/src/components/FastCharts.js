import React, { useContext } from 'react'
import { Bar } from 'react-chartjs-2'
import styled from 'styled-components'
import { FastsContext } from '../data/FastsContext'
import { timeDifference } from '../lib/timeConversion'

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

    const chartFasts = fasts.map(fast => {
        if (fast.isActive || fast.endDate === null) {
            return
        }
        const startDate = new Date(fast.startDate)
        const endDate = new Date(fast.endDate)
        const duration = timeDifference(startDate, endDate)

        const dayName = startDate.toString().split(' ')[0]
        const dayNumber = startDate.toString().split(' ')[2]

        labels.push(`${dayName}/${dayNumber}`)

        return Number.parseInt(duration.hours) + 24 * Number.parseInt(duration.days)
    })

    return [chartFasts, labels]
}

const FastCharts = () => {
    const { fasts } = useContext(FastsContext)
    const [chartFasts, labels] = getFastData(fasts)

    // TODO: update fast when clicked on chart
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
                stacked={false}
                getElementAtEvent={elems => handleClick(elems)}
            />
        </ChartStyles>
    )
}

export default FastCharts
