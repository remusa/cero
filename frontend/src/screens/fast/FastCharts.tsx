import { differenceInHours } from 'date-fns'
import React, { useContext, useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import styled from 'styled-components'
import Modal from '../../components/modal/Modal'
import { FastsContext } from '../../data/FastsContext'
import { IFast } from './../../data/FastsContext'

const ChartWrapper = styled.div`
    position: relative;
    overflow-x: scroll;
    /* max-width: 300px; */
    width: 300px;
    margin-bottom: 8px;
    padding: 4px;
    border-radius: 3px;
    box-shadow: 0 0 8px ${props => props.theme.boxShadow};

    @media all and (max-width: 500px) {
        padding-bottom: 8px;
    }
`

function getFastData(fasts: IFast[]) {
    const labels: string[] = []
    // let count = 1

    const chartFasts = fasts.map(fast => {
        if (fast.isActive || !fast.endDate) return

        // if (count > 7) return
        // count++

        const startDate: Date = new Date(fast.startDate)
        const endDate: Date = new Date(fast.endDate)
        const dayName: string = startDate.toString().split(' ')[0]
        const dayNumber: string = startDate.toString().split(' ')[2]

        labels.push(`${dayName}/${dayNumber}`)
        return differenceInHours(endDate, startDate)
    })

    return [chartFasts, labels]
}

const FastCharts: React.FC = () => {
    const { fasts } = useContext(FastsContext)

    const [chartFasts, chartLabels] = getFastData(fasts)
    const [d, setF] = useState(chartFasts)
    const [l, setL] = useState(chartLabels)

    const [id, setId] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [isActive, setIsActive] = useState(false)

    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        const [t1, t2] = getFastData(fasts)

        setF(t1)
        setL(t2)
    }, [fasts])

    const toggleModal = () => setIsModalOpen(!isModalOpen)

    // FastCharts.handleClickOutside = () => setIsModalOpen(false)

    const handleClick = (e: any) => {
        if (!e[0]) return

        const index: number = e[0]._index

        setId(fasts[index].id)
        setStartDate(fasts[index].startDate)
        setEndDate(fasts[index].endDate)
        setIsActive(fasts[index].isActive)

        toggleModal()
    }

    const chartOptions = {
        // maintainAspectRatio: false,
        scales: {
            yAxes: [
                {
                    display: true,
                    ticks: {
                        // stepSize: 1,
                        beginAtZero: true,
                        // suggestedMin: 0,
                        // min: 0,
                        suggestedMax: 24,
                        // max: 24,
                    },
                },
            ],
        },
    }

    const chartData = {
        labels: l, // labels
        datasets: [
            {
                label: 'Duration',
                data: d, // chartFasts
                backgroundColor: '#17ff7b',
                borderColor: '#00c957',
                borderWidth: 1,
                hoverBackgroundColor: '#00c957',
                // hoverBorderColor: '#007d36',
                legend: {
                    display: true,
                    labels: {
                        boxWidth: 50,
                        fontSize: 10,
                        fontColor: '#bbb',
                        padding: 5,
                    },
                },
            },
        ],
    }

    return (
        <ChartWrapper>
            <Modal
                show={isModalOpen}
                onClose={toggleModal}
                id={id}
                startDate={startDate}
                endDate={endDate}
                isActive={isActive}
                setId={setId}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                setIsActive={setIsActive}
            />

            <Bar
                data={chartData}
                options={chartOptions}
                stacked={false}
                getElementAtEvent={element => handleClick(element)}
            />
        </ChartWrapper>
    )
}

// const clickOutsideConfig = {
//     handleClickOutside: () => FastCharts.handleClickOutside,
// }

export default FastCharts
// export default onClickOutside(FastCharts, clickOutsideConfig)
