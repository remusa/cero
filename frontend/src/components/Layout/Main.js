import { PropTypes } from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const MainStyles = styled.main`
    grid-area: main;

    display: flex;
    flex-flow: column wrap;
    /* justify-content: flex-start; */
    justify-content: center;
    align-items: center;
    padding: 16px;

    @media all and (max-width: 500px) {
        justify-content: flex-start;
    }
`

const Main = ({ children }) => <MainStyles>{children}</MainStyles>

Main.propTypes = {
    children: PropTypes.any,
}

export default Main
