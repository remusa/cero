import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { differenceInHours } from 'date-fns'
import { FastsContext } from '../data/FastsContext'
import Modal from './Modal'

const RowsStyles = styled.div`
    margin: 0 auto;
    /* width: auto; */
    /* height: auto; */

    @media all and (max-width: 500px) {
        /* width: 90%; */
        /* height: 400px; */
        margin: 8px;
    }
`

const TableStyles = styled.table`
    border-spacing: 0;
    border: 1px solid var(--color-grey);
    border-radius: 4px;

    thead {
        font-size: 1rem;
        padding: 4px;

        border-bottom: 4px solid var(--color-primary);
    }

    .divider {
        /* margin-bottom: 1px; */
        width: 100%;
        height: 3px;
        border-radius: 1px;
        background-color: var(--color-primary);
        pointer-events: none;
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

const FastTable = () => {
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
        // console.log(`fast: ${Object.entries(fast)}`)
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

                    <tr>
                        <td colSpan='4'>
                            <div colSpan='4' className='divider' />
                        </td>
                    </tr>
                </thead>

                <tbody>
                    {fasts
                        .map(fast => {
                            // if (fast.isActive || !fast.endDate) return
                            if (!fast.endDate) return

                            const { startDate, endDate, isActive, duration } = fast
                            const totalHours = differenceInHours(endDate, startDate)

                            return (
                                <tr key={fast.id} onClick={e => handleClick(e, fast)}>
                                    <td>{new Date(startDate).toISOString().slice(5, 10)}</td>
                                    <td>
                                        {endDate
                                            ? new Date(endDate).toISOString().slice(5, 10)
                                            : '-'}
                                    </td>
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

export default FastTable
