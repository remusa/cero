import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import styled from 'styled-components'
import { UPDATE_FAST_MUTATION } from '../gql/FastMutation'
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
`

const Modal = props => {
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
        await update().then(res => props.onClose())
        props.setId(null)
        props.setStartDate('')
        props.setEndDate('')
        props.setIsActive(false)
    }

    if (!props.show) return null

    const variables = {
        id: props.id,
        startDate: props.startDate,
        endDate: props.endDate,
        isActive: props.isActive,
    }
    console.log(`VARIABLES: ${Object.entries(variables)}`)

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
                                <p>ID: {props.id}</p>

                                <label htmlFor='startDate'>
                                    Start Date
                                    <input
                                        disabled
                                        type='text'
                                        name='startDate'
                                        placeholder='startDate'
                                        value={props.startDate}
                                    />
                                    <DatePicker
                                        selected={new Date(props.startDate)}
                                        showTimeInput
                                        timeInputLabel='Time:'
                                        onChange={date => {
                                            props.setStartDate(date)
                                        }}
                                        dateFormat='MM/dd/yyyy h:mm aa'
                                    />
                                </label>

                                <label htmlFor='endDate'>
                                    End Date
                                    <input
                                        disabled
                                        type='text'
                                        name='endDate'
                                        placeholder='endDate'
                                        value={props.endDate}
                                    />
                                    <DatePicker
                                        selected={new Date(props.endDate)}
                                        showTimeInput
                                        timeInputLabel='Time:'
                                        onChange={date => {
                                            props.setEndDate(date)
                                        }}
                                        dateFormat='MM/dd/yyyy h:mm aa'
                                    />
                                </label>

                                <label htmlFor='isActive'>
                                    Currently active?
                                    <input
                                        type='checkbox'
                                        name='isActive'
                                        checked={props.isActive}
                                        onChange={e => {
                                            props.setIsActive(e.target.checked)
                                        }}
                                    />
                                </label>

                                <button type='submit'>Update</button>

                                <ResetStyles onClick={props.onClose}>Go back</ResetStyles>
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
