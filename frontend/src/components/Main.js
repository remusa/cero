import React from 'react'
import styled from 'styled-components'

const MainStyles = styled.main`
    grid-area: main;

    display: flex;
    flex-flow: row;
    justify-content: center;
    /* align-items: center; */
`

const Main = props => {
    return <MainStyles>{props.children}</MainStyles>
}

export default Main
