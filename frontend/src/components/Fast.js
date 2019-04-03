import React, { Component } from 'react'
import styled from 'styled-components'

import FastTimer from './FastTimer'
import FastCharts from './FastCharts'

const MainStyles = styled.main`
    max-width: 1000px;
    margin: 0 auto;
    /* display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; */
`

class Fast extends Component {
    render() {
        return (
            <MainStyles>
                <h2>Fast!</h2>

                <FastTimer />

                <FastCharts />
            </MainStyles>
        )
    }
}

export default Fast
