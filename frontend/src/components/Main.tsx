import React from 'react'
import { PropTypes } from 'prop-types'
import styled from 'styled-components'

const MainStyles = styled.main`
    grid-area: main;

    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;
    /* padding: 16px; */

    @media all and (max-width: 500px) {
        justify-content: flex-start;
    }
`

interface IProps {
    children: React.ReactNode
}

const Main: React.FC<IProps> = ({ children }) => <MainStyles>{children}</MainStyles>

Main.propTypes = {
    children: PropTypes.any,
}

export default Main
