import React from 'react'
import { MockedProvider } from '@apollo/react-testing'
import { render, wait as waitTL } from '@testing-library/react'
import wait from 'waait'
import { CURRENT_USER_QUERY } from '../../gql/UserQuery'
import { fakeUser } from '../../lib/testUtils'
import { mount } from 'enzyme'
import Navigation from './../Header'

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

it.skip('should render the minimal header when logged out', async () => {
    const { getByText, container } = render(
        <MockedProvider mocks={notSignedInMocks} addTypename={false}>
            <Navigation />
        </MockedProvider>
    )

    await wait()

    const nav = getByText('navigation')
    expect(container).toMatchSnapshot()
})

it.skip('should render the minimal header when logged out', async () => {
    const wrapper = mount(
        <MockedProvider mocks={notSignedInMocks} removeTypename>
            <Navigation />
        </MockedProvider>
    )

    await wait()
    wrapper.update()
    console.log(wrapper.debug())

    const nav = wrapper.find('div[data-test="navigation"]')
    expect(toJSON(nav)).toMatchSnapshot()
})

it.skip('should render the minimal header when logged out', async () => {
    const wrapper = mount(
        <MockedProvider mocks={signedInMocks}>
            <Navigation />
        </MockedProvider>
    )

    await wait()
    wrapper.update()
    console.log(wrapper.debug())

    const nav = wrapper.find('div[data-test="navigation"]')
    expect(toJSON(nav)).toMatchSnapshot()
})
