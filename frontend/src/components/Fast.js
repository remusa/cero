import React from 'react'
import styled from 'styled-components'
import Main from './Main'
import PleaseSignIn from './PleaseSignIn'
import FastTimer from './FastTimer'
import FastCharts from './FastCharts'

const FastStyles = styled.div`
    grid-area: main;

    .fast__info {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        align-items: center;
    }

    @media all and (max-width: 500px) {
        .fast__info {
            flex-flow: column wrap;
            justify-content: center;
            align-items: center;
        }
    }
`

const Fast = () => (
    <PleaseSignIn>
        {/* <Main> */}
        <FastStyles>
            <h2>Fast!</h2>
            <div className="fast__info">
                <FastTimer />
                <FastCharts />
            </div>
        </FastStyles>
        {/* </Main> */}
    </PleaseSignIn>
)

export default Fast
