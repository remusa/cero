import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/react-hooks'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import styled from 'styled-components'
// import onClickOutside from 'react-onclickoutside'
import { DELETE_FAST_MUTATION, UPDATE_FAST_MUTATION } from '../../gql/FastMutation'
import { ALL_FASTS_QUERY } from '../../gql/FastQuery'
import Error from '../ErrorMessage'
import { ResetStyles } from '../User/Login'
import FormStyles from '../styled/Form'

const BackdropStyles = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 89;
    background-color: rgba(0, 0, 0, 0.8);
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

    .buttons_container {
        display: flex;
        flex-flow: column row;
        justify-content: space-evenly;
        align-items: center;

        margin-top: 8px;
    }
`

const DeleteStyles = styled.div`
    button {
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

const CloseButtonStyles = styled.div`
    cursor: pointer;
    border-radius: 5px;
    background: red;
    color: white;

    z-index: 100;
    position: relative;
    top: 0;
    right: 0;
`

const DeleteButton = ({ id, onClick }) => {
    const handleClick = async (e, deleteFast) => {
        e.preventDefault()

        if (window.confirm('Delete fast?')) {
            await deleteFast().then(res => onClick())
        }
    }

    const [deleteFast, { loading }] = useMutation(DELETE_FAST_MUTATION, {
        variables: { id },
        refetchQueries: [{ query: ALL_FASTS_QUERY }],
    }) // variables: { last: 7 }

    return (
        <DeleteStyles>
            <button type='button' disabled={loading} onClick={e => handleClick(e, deleteFast)}>
                Delete
            </button>
        </DeleteStyles>
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

    // const [width, setWidth] = useState(0)
    // const [height, setHeight] = useState(0)
    // const ref = useRef(null)

    /* eslint-disable */
    // useEffect(() => {
    //     setHeight(ref.current.clientHeight)
    //   },
    // [])
    /* eslint-enable */

    const handleSubmit = async (e, action) => {
        e.preventDefault()
        await action().then(onClose())
        setId(null)
        setStartDate('')
        setEndDate('')
        setIsActive(false)
    }

    // const handleClickOutside = e => {
    //     const { offsetX, offsetY } = e.nativeEvent
    // console.log(`X: ${offsetX}, Y: ${offsetY}`)
    // onClose()
    // onClick={e => handleClickOutside(e)}
    // }

    // Modal.handleClickOutside = () => onClose

    const variables = {
        id,
        startDate,
    }
    if (endDate) {
        variables.endDate = endDate
    }

    const [update, { error, loading }] = useMutation(UPDATE_FAST_MUTATION, {
        variables,
        refetchQueries: [{ query: ALL_FASTS_QUERY }],
    }) // variables: { last: 7 }

    if (!show) return null

    return (
        <BackdropStyles>
            <ModalStyles>
                {/* <CloseButtonStyles onClick={onClose}>X</CloseButtonStyles> */}
                <FormStyles>
                    <form
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
                                <DatePicker
                                    selected={new Date(startDate)}
                                    showTimeInput
                                    timeInputLabel='Time:'
                                    onChange={date => {
                                        setStartDate(date)
                                    }}
                                    dateFormStylesat='MM/dd/yyyy h:mm aa'
                                />
                            </label>

                            <label htmlFor='endDate'>
                                End Date: {'\t'}
                                <DatePicker
                                    disabled={isActive}
                                    selected={endDate ? new Date(endDate) : ''}
                                    showTimeInput
                                    timeInputLabel='Time:'
                                    onChange={date => {
                                        setEndDate(date)
                                    }}
                                    dateFormStylesat='MM/dd/yyyy h:mm aa'
                                />
                            </label>

                            <div className='buttons_container'>
                                <button type='submit'>Update</button>
                                {!isActive && <DeleteButton id={id} onClick={onClose} />}
                            </div>

                            <ResetStyles onClick={onClose}>Go back</ResetStyles>
                        </fieldset>
                    </form>
                </FormStyles>
            </ModalStyles>
        </BackdropStyles>
    )
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    id: PropTypes.string,
    setId: PropTypes.func.isRequired,
    startDate: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.instanceOf(Date).isRequired,
    ]),
    setStartDate: PropTypes.func.isRequired,
    endDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    setEndDate: PropTypes.func.isRequired,
    isActive: PropTypes.bool.isRequired,
    setIsActive: PropTypes.func.isRequired,
}

// const clickOutsideConfig = {
//     handleClickOutside: () => Modal.handleClickOutside,
// }

// export default onClickOutside(Modal, clickOutsideConfig)
export default Modal
