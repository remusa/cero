import React from 'react'
import styled from 'styled-components'
import PleaseSignIn from './PleaseSignIn'

const ProfileStyles = styled.div`
    grid-area: main;

    display: flex;
    flex-flow: column wrap;
    justify-contents: center;
    align-items: center;
`

const ProfilePage = () => {
    console.log(`Profile page: `)

    return (
        <PleaseSignIn>
            <ProfileStyles>
                <h1>Profile</h1>
                <h2>Coming soon...</h2>
            </ProfileStyles>
        </PleaseSignIn>
    )
}

export default ProfilePage