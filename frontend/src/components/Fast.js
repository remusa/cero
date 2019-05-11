import React, { Component } from 'react'
import Main from './Main'
import PleaseSignIn from './PleaseSignIn'
import FastTimer from './FastTimer'
import FastCharts from './FastCharts'

class Fast extends Component {
    render() {
        return (
            <PleaseSignIn>
                <Main>
                    <h2>Fast!</h2>
                    <FastTimer />
                    <FastCharts />
                </Main>
            </PleaseSignIn>
        )
    }
}

export default Fast
