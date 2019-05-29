import React, { useState, useContext } from 'react'
import { Bar } from 'react-chartjs-2'
import styled from 'styled-components'
import { FastsContext } from '../data/FastsContext'
import { timeDifference } from '../lib/timeConversion'
import Modal from './Modal'

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
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [id, setId] = useState(null)

    // TODO: update fast when clicked on chart
    const toggleModal = e => {
        console.log(`isModalOpen: ${isModalOpen}`)
        setIsModalOpen(!isModalOpen)
    }

    const handleClick = e => {
        if (!e[0]) return
        const index = e[0]._index
        setId(fasts[index].id)
        toggleModal()
    }

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Duration',
                data: chartFasts,
                backgroundColor: '#17ff7b',
                borderColor: '#00c957',
                borderWidth: 1,
                hoverBackgroundColor: '#00c957',
                hoverBorderColor: '#007d36',
                legend: {
                    display: true,
                    labels: {
                        boxWidth: 50,
                        fontSize: 10,
                        fontColor: '#bbb',
                        padding: 5,
                    },
                },
                scales: {
                    yAxes: [
                        {
                            display: true,
                            ticks: {
                                beginAtZero: true,
                                max: 100,
                                suggestedMax: 24,
                            },
                        },
                    ],
                },
            },
        ],
    }

    return (
        <ChartStyles>
            <Modal show={isModalOpen} onClose={toggleModal} id={id} />
            <Bar
                data={chartData}
                options={{}}
                stacked={false}
                getElementAtEvent={element => handleClick(element)}
            />
        </ChartStyles>
    )
}

export default FastCharts
