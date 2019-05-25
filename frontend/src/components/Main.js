import { PropTypes } from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const MainStyles = styled.main`
    grid-area: main;

    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;
`

const Main = ({ children }) => <MainStyles>{children}</MainStyles>

Main.propTypes = {
    children: PropTypes.object.isRequired,
}

export default Main
