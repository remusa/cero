import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import styled from 'styled-components'
import { UPDATE_FAST_MUTATION, DELETE_FAST_MUTATION } from '../gql/FastMutation'
import { ALL_FASTS_QUERY } from '../gql/FastQuery'
import Error from './ErrorMessage'
import { ResetStyles } from './Login'
import Form from './styled/Form'

const BackdropStyles = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 89;
    background-color: rgba(0, 0, 0, 0.5);
    transform: scale(1);
    transition: 0.3s ease-in-out;

    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;
`

const ModalStyles = styled.div`
    background-color: var(--color-white);
    box-shadow: 0 0 20px var(--color-primary-darker);
    border-radius: 20px;
    z-index: 99;
    /*
    max-width: 500;
    min-height: 300; */

    .buttons_container {
        display: flex;
        flex-flow: column row;
        justify-content: space-evenly;
        align-items: center;

        margin-top: 8px;
    }
`

const DeleteStyles = styled.div`
    /* display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;
    margin-top: 8px; */

    button {
        /* display: block; */
        width: auto;
        border: 0;
        border-radius: 5px;
        font-size: 1.7rem;
        padding: 0.5rem 1.2rem;
        background: red;
        color: white;
        font-weight: 600;
        font-size: 1.7rem;
        transform: skew(-2deg);
        transition: all 0.5s;

        &[disabled] {
            opacity: 0.5;
        }
    }
`

const DeleteButton = props => {
    const handleClick = async (e, deleteFast) => {
        e.preventDefault()

        if (window.confirm('Delete fast?')) {
            await deleteFast().then(res => props.onClick())
        }
    }

    return (
        <Mutation
            mutation={DELETE_FAST_MUTATION}
            variables={{ id: props.id }}
            refetchQueries={[{ query: ALL_FASTS_QUERY }]}
        >
            {(deleteFast, { data, error, loading }) => (
                <DeleteStyles>
                    <button
                        type='button'
                        disabled={loading}
                        onClick={e => handleClick(e, deleteFast)}
                    >
                        Delete
                    </button>
                </DeleteStyles>
            )}
        </Mutation>
    )
}

DeleteButton.propTypes = {
    id: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
}

const Modal = ({
    show,
    onClose,
    id,
    setId,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    isActive,
    setIsActive,
}) => {
    const [formError, setFormError] = useState(null)
    // const [id, setId] = useState(props.id)
    // const [startDate, setStartDate] = useState(props.startDate)
    // const [endDate, setEndDate] = useState(props.endDate)
    // const [isActive, setIsActive] = useState(props.isActive)

    // useEffect(() => {
    //     setId(props.id)
    //     setStartDate(props.startDate)
    //     setEndDate(props.endDate)
    //     setIsActive(props.isActive)
    // }, [props.endDate, props.isActive, props.startDate])

    const handleSubmit = async (e, update) => {
        e.preventDefault()

        await update().then(res => onClose())

        setId(null)
        setStartDate('')
        setEndDate('')
        setIsActive(false)
    }

    if (!show) return null

    const variables = {
        id,
        startDate,
        endDate,
        isActive,
    }

    return (
        <Mutation
            mutation={UPDATE_FAST_MUTATION}
            variables={variables}
            refetchQueries={[{ query: ALL_FASTS_QUERY }]}
        >
            {(update, { error, loading, called }) => (
                <BackdropStyles>
                    <ModalStyles>
                        <Form
                            method='POST'
                            onSubmit={e => {
                                handleSubmit(e, update)
                            }}
                        >
                            <fieldset disabled={loading} aria-busy={loading}>
                                <Error error={error} />

                                {formError && <p>{formError}</p>}

                                <h2>Update fast</h2>
                                <p>ID: {id}</p>

                                <label htmlFor='startDate'>
                                    Start Date: {'\t'}
                                    {/* <input
                                        disabled
                                        type='text'
                                        name='startDate'
                                        placeholder='startDate'
                                        value={startDate}
                                    /> */}
                                    <DatePicker
                                        selected={new Date(startDate)}
                                        showTimeInput
                                        timeInputLabel='Time:'
                                        onChange={date => {
                                            setStartDate(date)
                                        }}
                                        dateFormat='MM/dd/yyyy h:mm aa'
                                    />
                                </label>

                                <label htmlFor='endDate'>
                                    End Date: {'\t'}
                                    {/* <input
                                        disabled
                                        type='text'
                                        name='endDate'
                                        placeholder='endDate'
                                        value={endDate}
                                    /> */}
                                    <DatePicker
                                        selected={endDate ? new Date(endDate) : ''}
                                        showTimeInput
                                        timeInputLabel='Time:'
                                        onChange={date => {
                                            setEndDate(date)
                                        }}
                                        dateFormat='MM/dd/yyyy h:mm aa'
                                    />
                                </label>

                                {/* <label htmlFor='isActive'>
                                    Currently active?
                                    <input
                                        type='checkbox'
                                        name='isActive'
                                        checked={isActive}
                                        onChange={e => {
                                            setIsActive(e.target.checked)
                                        }}
                                    />
                                </label> */}

                                <div className='buttons_container'>
                                    <button type='submit'>Update</button>
                                    <DeleteButton id={id} onClick={onClose} />
                                </div>

                                <ResetStyles onClick={onClose}>Go back</ResetStyles>
                            </fieldset>
                        </Form>
                    </ModalStyles>
                </BackdropStyles>
            )}
        </Mutation>
    )
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    // children: PropTypes.node,
}

export default Modal
