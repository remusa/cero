import React from 'react'
import { render, fireEvent, queryByText, cleanup } from '@testing-library/react'
import Login from '../Login'
import { CURRENT_USER_QUERY } from './../../../gql/UserQuery'
import { fakeUser } from './../../../lib/testUtils'
import { MockedProvider } from '@apollo/react-testing'

afterEach(cleanup)

const notSignedInMocks = [
    {
        request: { query: CURRENT_USER_QUERY },
        result: { data: { me: null } },
    },
]

const signedInMocks = [
    {
        request: { query: CURRENT_USER_QUERY },
        result: { data: { me: fakeUser() } },
    },
]

it.only('should render the minimal header when logged out', async () => {
    const { getByText, container } = render(
        <MockedProvider mocks={notSignedInMocks} addTypename={false}>
            <Login />
        </MockedProvider>
    )

    await wait()

    const nav = getByText('navigation')
    expect(container).toMatchSnapshot()
})

it.skip('calls onSubmit with email/password when submitted', () => {
    // Arrange
    const fakeUser = { email: 'test@test.com', password: '12345qwerty' }
    const handleSubmit = jest.fn()

    const { getByLabelText, getByText } = render(<Login />)

    const emailNode = getByLabelText(/email/i)
    const passwordNode = getByLabelText(/password/i)
    const submitButtonNode = getByLabelText(/login/i)

    // Act
    emailNode.value = fakeUser.email
    passwordNode.value = fakeUser.password
    fireEvent.click(submitButtonNode)

    // Assert
    expect(handleSubmit).toHaveBeenCalledTimes(1)
    expect(handleSubmit).toHaveBeenCalledWith(fakeUser)
})
