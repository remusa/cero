import React, { useState, useContext } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Field, Form, Formik, ErrorMessage } from 'formik'
import * as yup from 'yup'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import PleaseSignIn from './PleaseSignIn'
import { UPDATE_USER_MUTATION } from '../../gql/UserMutation'
import FormStyles from '../styled/Form'
import Error from '../ErrorMessage'
import { CURRENT_USER_QUERY } from '../../gql/UserQuery'
import { UserContext } from '../../data/UserContext'

const ProfileStyles = styled.div`
    grid-area: main;

    display: flex;
    flex-flow: column wrap;
    justify-content: flex-start;
    align-items: center;
`

const validationSchema = yup.object().shape({
    goal: yup
        .string()
        // .min(3, 'Username must be at least 3 characters long')
        .max(4, 'Goal must be max. 4 characters'),
})

const ProfilePage = () => {
    const [goal, setGoal] = useState('')
    const { user } = useContext(UserContext)

    const updates = {}
    if (Number.parseInt(goal) > 0) {
        updates.goal = Number.parseInt(goal)
    }

    const resetState = () => {
        setGoal('')
    }

    const showToasts = updatedValues => {
        const entries = Object.entries(updatedValues)

        for (const [property, value] of entries) {
            const message = `${property.charAt(0).toUpperCase()}${property.slice(
                1
            )} set to ${value}`

            toast.info(message, {
                position: 'bottom-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
            })
        }
    }

    const handleChange = e => {
        const { name, value } = e.target
        if (name === 'goal') setGoal(value)
    }

    const handleSubmit = async (e, action) => {
        e.preventDefault()
        if (Number.parseInt(goal) <= 0 || goal === '') return
        await action().then(resetState())
        await showToasts(updates)
    }

    const [updateUser, { error, loading }] = useMutation(UPDATE_USER_MUTATION, {
        variables: updates,
        refetchQueries: [{ query: CURRENT_USER_QUERY }],
    })

    return (
        <PleaseSignIn>
            <ProfileStyles>
                <h1>Profile</h1>

                <FormStyles>
                    <form
                        method="POST"
                        onSubmit={e => {
                            handleSubmit(e, updateUser)
                        }}
                    >
                        <fieldset disabled={loading} aria-busy={loading}>
                            <h2>Update user</h2>

                            <Error error={error} />

                            <label htmlFor="goal">
                                Target fast
                                <input
                                    type="number"
                                    min="1"
                                    name="goal"
                                    placeholder={user.goal}
                                    value={goal}
                                    onChange={handleChange}
                                />
                            </label>

                            <button type="submit">Update</button>
                        </fieldset>
                    </form>
                </FormStyles>
            </ProfileStyles>
        </PleaseSignIn>
    )
}

export default ProfilePage
