import React, { useContext } from 'react'
import styled from 'styled-components'
import { FastsContext, FastsProvider } from '../data/FastsContext'
import FastCharts from './FastCharts'
import PleaseSignIn from './PleaseSignIn'

const ProfileStyles = styled.div`
    grid-area: main;

    display: flex;
    flex-flow: column wrap;
    justify-contents: center;
    align-items: center;
`

const ProfilePage = () => {
    // const { fasts } = useContext(FastsContext)
    console.log(`Profile page: `)

    return (
        <PleaseSignIn>
            <ProfileStyles>
                <h2>Profile</h2>

                <h3>Coming soon...</h3>
            </ProfileStyles>
        </PleaseSignIn>
    )
}

export default ProfilePage
