import React, { useState, useEffect, useContext } from 'react'
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

    const [chartFasts, chartLabels] = getFastData(fasts)
    const [d, setF] = useState(chartFasts)
    const [l, setL] = useState(chartLabels)

    const [isModalOpen, setIsModalOpen] = useState(false)

    // Fast info
    const [id, setId] = useState(null)
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
        const [t1, t2] = getFastData(fasts)
        setF(t1)
        setL(t2)
    }, [fasts])

    // TODO: update fast when clicked on chart
    const toggleModal = e => {
        setIsModalOpen(!isModalOpen)
    }

    const handleClick = e => {
        if (!e[0]) return
        const index = e[0]._index
        setId(fasts[index].id)
        setStartDate(fasts[index].startDate)
        setEndDate(fasts[index].endDate)
        setIsActive(fasts[index].isActive)
        toggleModal()
    }

    const chartData = {
        // labels,
        labels: l,
        datasets: [
            {
                label: 'Duration',
                // data: chartFasts,
                data: d,
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
            <Modal
                show={isModalOpen}
                onClose={toggleModal}
                id={id}
                startDate={startDate}
                endDate={endDate}
                isActive={isActive}
            />
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
