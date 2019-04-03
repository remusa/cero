import React from 'react'
import Chart from 'chart.js'
import ReactChartkick, { ColumnChart } from 'react-chartkick'
import styled from 'styled-components'

ReactChartkick.addAdapter(Chart)

const testdata = [
    ['Sun 1', 16],
    ['Mon 2', 14],
    ['Tue 3', 3],
    ['Wed 4', 16],
    ['Thu 5', 20],
    ['Fri 6', 23],
    ['Sat 7', 12],
]

const ChartStyles = styled.div`
    margin: 0 auto;

    @media all and (max-width: 800px) {
        width: 90%;
    }
`

const FastCharts = () => (
    <ChartStyles>
        <ColumnChart data={testdata} max={24} colors={['#00c957', '#666']} stacked={true}/>
    </ChartStyles>
)

export default FastCharts
