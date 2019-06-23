import React from 'react'
import styled from 'styled-components'
import Permissions from './Permissions'
import PleaseSignIn from '../User/PleaseSignIn'

const PermissionsStyles = styled.div`
    grid-area: main;
`

const PermissionsPage = () => (
    <PermissionsStyles>
        <PleaseSignIn>
            <Permissions />
        </PleaseSignIn>
    </PermissionsStyles>
)

export default PermissionsPage
