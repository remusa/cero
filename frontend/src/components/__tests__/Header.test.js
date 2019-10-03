import { MockedProvider } from '@apollo/react-testing'
import { render, wait } from '@testing-library/react'
// import wait from 'waait'
import { CURRENT_USER_QUERY } from '../../gql/UserQuery'
import { fakeUser } from '../../lib/testUtils'
import { mount } from 'enzyme'

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
    const wrapper = mount(
        <MockedProvider mocks={notSignedInMocks} removeTypename>
            <Navigation />
        </MockedProvider>
    )

    await wait()
    wrapper.update()
    console.log(wrapper.debug())

    const nav = wrapper.find('ul[data-test="nav"]')
    expect(toJSON(nav)).toMatchSnapshot()
})

it('should render the minimal header when logged out', async () => {
    const { getByText, container } = render(
        <MockedProvider mocks={notSignedInMocks} addTypename={false}>
            <Navigation />
        </MockedProvider>
    )

    await wait()

    // const nav = getByText('navigation')
    expect(container).toMatchSnapshot()
})

// it('should render the minimal header when logged out', () => {
//     const wrapper = mount(
//         <MockedProvider mocks={signedInMocks}>
//             <Navigation />
//         </MockedProvider>
//     )

//     await wait()
//     wrapper.update()
//     console.log(wrapper.debug())

//     // const nav = wrapper.find('ul[data-test="nav"]')
//     // expect(toJSON(nav)).toMatchSnapshot()
// })
