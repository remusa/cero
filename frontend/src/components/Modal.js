import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Mutation } from 'react-apollo'
import styled from 'styled-components'
import { UPDATE_FAST_MUTATION } from '../gql/FastMutation'
import { CURRENT_USER_QUERY } from '../gql/UserQuery'
import Error from './ErrorMessage'
import Form from './styled/Form'
import { ResetStyles } from './Login'

const BackdropStyles = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
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
    /*
    max-width: 500;
    min-height: 300; */
`

const Modal = props => {
    const [formState, setFormState] = useState({})
    const [formError, setFormError] = useState(null)

    // <ModalStyles>
    // {props.children}
    // </ModalStyles>

    const handleChange = e => {
        console.log(e.target.value)
    }

    const handleSubmit = async (e, update) => {
        e.preventDefault()
        await update()
        setFormState({})
    }

    if (!props.show) return null

    return (
        <Mutation
            mutation={UPDATE_FAST_MUTATION}
            variables={{ id: props.id }}
            refetchQueries={[{ query: CURRENT_USER_QUERY }]}
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
                                <p>{props.id}</p>

                                <label htmlFor='startDate'>
                                    Start Date
                                    <input
                                        type='text'
                                        name='endDate'
                                        placeholder='endDate'
                                        value='startDate'
                                        onChange={handleChange}
                                    />
                                </label>

                                <label htmlFor='endDate'>
                                    End Date
                                    <input
                                        type='text'
                                        name='endDate'
                                        placeholder='endDate'
                                        value='endDate'
                                        onChange={handleChange}
                                    />
                                </label>

                                <label htmlFor='isActive'>
                                    Active?
                                    <input type='checkbox' name='isActive' />
                                </label>

                                <label htmlFor='duration'>
                                    Duration
                                    <input
                                        disabled
                                        type='text'
                                        name='duration'
                                        placeholder='duration'
                                        value='duration'
                                        onChange={handleChange}
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
