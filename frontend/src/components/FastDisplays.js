import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { getDate, getMonth, getHours, getMinutes, differenceInHours } from 'date-fns'
import { FastsContext } from '../data/FastsContext'
import { timeConversion, timeDifference } from '../lib/timeConversion'
import Modal from './Modal'

const RowsStyles = styled.div`
    margin: 0 auto;
    /* width: auto; */
    /* height: auto; */

    @media all and (max-width: 800px) {
        /* width: 90%; */
        /* height: 400px; */
    }
`

const TableStyles = styled.table`
    border-spacing: 0;
    width: 100%;
    /* border: 1px solid var(--color-primary); */
    box-shadow: 0 0 20px var(--color-primary-darker);
    border-radius: 20px;

    thead {
        font-size: 1rem;
    }

    td,
    th {
        font-size: 1.2rem;
        padding: 4px;
        position: relative;

        label {
            padding: 8px 4px;
            display: block;
        }
    }

    tr {
        &:hover {
            background: var(--color-primary);
            box-shadow: 0 0 20px var(--color-primary-darker);
            border-radius: 20px;
        }
    }
`

const FastDisplay = () => {
    const { fasts, activeFast } = useContext(FastsContext)
    // const [f, setF] = useState(activeFast)

    // Fast info
    const [id, setId] = useState(null)
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [isActive, setIsActive] = useState(false)

    // Modal
    const [isModalOpen, setIsModalOpen] = useState(false)

    /* eslint-disable */
    // useEffect(() => {
    //     setF(activeFast)
    // }, [])
    /* eslint-enable */

    // TODO: update fast when clicked on chart
    const toggleModal = e => {
        setIsModalOpen(!isModalOpen)
    }

    const handleClick = (e, fast) => {
        if (!e) return
        console.log(`fast: ${Object.entries(fast)}`)
        setId(fast.id)
        setStartDate(fast.startDate)
        setEndDate(fast.endDate)
        setIsActive(fast.isActive)
        toggleModal()
    }

    return (
        <RowsStyles>
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

            <TableStyles>
                <thead>
                    <tr>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Finished?</th>
                        <th>Duration</th>
                    </tr>
                </thead>

                <tbody>
                    {fasts
                        .map(fast => {
                            const { startDate, endDate, isActive, duration } = fast
                            const totalHours = differenceInHours(endDate, startDate)

                            return (
                                <tr key={fast.id} onClick={e => handleClick(e, fast)}>
                                    <td>{new Date(startDate).toISOString().slice(5, 10)}</td>
                                    <td>{new Date(endDate).toISOString().slice(5, 10)}</td>
                                    <td>{isActive ? '❌' : '✔️'}</td>
                                    <td>{totalHours} hrs.</td>
                                </tr>
                            )
                        })
                        .reverse()}
                </tbody>
            </TableStyles>
        </RowsStyles>
    )
}

export default FastDisplay
