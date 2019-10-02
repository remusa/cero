import React from 'react'
import styled from 'styled-components'
import PleaseSignIn from '../../components/User/PleaseSignIn'
import Permissions from './Permissions'

const PermissionsStyles = styled.div`
    grid-area: main;
`

const PermissionsPage: React.FC = () => (
    <PermissionsStyles>
        <PleaseSignIn>
            <Permissions />
        </PleaseSignIn>
    </PermissionsStyles>
)

export default PermissionsPage
