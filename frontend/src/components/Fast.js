import React from 'react'
import Main from './Main'
import PleaseSignIn from './PleaseSignIn'
import FastTimer from './FastTimer'
import FastCharts from './FastCharts'

const Fast = () => (
    <PleaseSignIn>
        <Main>
            <h2>Fast!</h2>
            <FastTimer />
            <FastCharts />
        </Main>
    </PleaseSignIn>
)

export default Fast
