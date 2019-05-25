import React from 'react'
import styled from 'styled-components'
import FastCharts from './FastCharts'
import PleaseSignIn from './PleaseSignIn'

const ProfileStyles = styled.div`
    grid-area: main;

    display: flex;
    flex-flow: row wrap;
    justify-contents: center;
    align-items: center;
`

const ProfilePage = () => (
    <PleaseSignIn>
        <ProfileStyles>
            <FastCharts />
        </ProfileStyles>
    </PleaseSignIn>
)

export default ProfilePage
