import React from 'react'
import { render, fireEvent, queryByText, cleanup } from "@testing-library/react";
import Login from '../Login'
// import * as jest from 'jest'

afterEach(cleanup)

it('calls onSubmit with email/password when submitted', () => {
    // Arrange
    const fakeUser = {email: 'test@test.com', password: '12345qwerty'}
    // const handleSubmit = jest.fn()

    const {getByLabelText, getByText} = render(<Login />)

    const emailNode = getByLabelText(/email/i)
    const passwordNode = getByLabelText(/password/i)
    const submitButtonNode = getByLabelText(/login/i)

    // Act
    // emailNode.value = fakeUser.email
    // passwordNode.value = fakeUser.password
    // fireEvent.click(submitButtonNode)

    // Assert
    // expect(handleSubmit).toHaveBeenCalledTimes(1)
    // expect(handleSubmit).toHaveBeenCalledWith(fakeUser)
});
