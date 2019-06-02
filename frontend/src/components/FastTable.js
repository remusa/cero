import React, { useContext, useState } from 'react'
import { differenceInHours } from 'date-fns'
import styled from 'styled-components'
import { FastsContext } from '../data/FastsContext'
import Modal from './Modal'
import { TableStyles } from './styled/Table'

const RowsStyles = styled.div`
    margin: 0 auto;

    @media all and (max-width: 500px) {
        margin: 8px;
    }
`

const FastTable = () => {
    const { fasts } = useContext(FastsContext)

    // Fast info
    const [id, setId] = useState(null)
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [isActive, setIsActive] = useState(false)

    // Modal
    const [isModalOpen, setIsModalOpen] = useState(false)

    const toggleModal = e => {
        setIsModalOpen(!isModalOpen)
    }

    const handleClick = (e, fast) => {
        if (!e) return
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
