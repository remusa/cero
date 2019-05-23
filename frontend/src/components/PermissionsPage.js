import React from 'react'
import styled from 'styled-components'

import PleaseSignIn from './PleaseSignIn'
import Permissions from './Permissions'

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
