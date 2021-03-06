import { differenceInHours } from 'date-fns'
import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import Modal from '../../components/modal/Modal'
import { TableStyles } from '../../components/styled/Table'
import { FastsContext } from '../../data/FastsContext'

const TableContainerStyles = styled.div`
    margin: 0 auto;
    overflow-y: scroll;
    max-height: 310px;
    border-radius: 3px;
    box-shadow: 0 0 8px ${props => props.theme.boxShadow};

    table {
        width: 285px !important;
    }import { IFast } from './../../data/FastsContext'


    @media all and (max-width: 500px) {
        margin-top: 8px;
        margin-bottom: 8px;
        padding-bottom: 8px;
    }
`

const FastTable: React.FC = () => {
    const { fasts } = useContext(FastsContext)

    const [id, setId] = useState<string>('')
    const [startDate, setStartDate] = useState<string>('')
    const [endDate, setEndDate] = useState<string>('')
    const [isActive, setIsActive] = useState<boolean>(false)

    const [isModalOpen, setIsModalOpen] = useState(false)

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen)
    }

    const handleClick = (e: React.MouseEvent, fast: IFast) => {
        if (!e) return

        setId(fast.id)
        setStartDate(fast.startDate)
        setEndDate(fast.endDate)
        setIsActive(fast.isActive)

        toggleModal()
    }

    const rows = 1

    return (
        <TableContainerStyles>
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
                        <td colSpan={4} className="divider" />
                    </tr>
                </thead>

                <tbody>
                    {fasts
                        .map(fast => {
                            {
                                /* if (rows > 7) return
                            rows++ */
                            }

                            const { startDate, endDate, isActive } = fast
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
                                    <td>{!isActive ? `${totalHours} hrs.` : '-'}</td>
                                </tr>
                            )
                        })
                        .reverse()}
                    {/* .reverse()} */}
                </tbody>
            </TableStyles>
        </TableContainerStyles>
    )
}

export default FastTable
