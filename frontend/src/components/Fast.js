import React, { Component } from 'react'
import Chart from 'chart.js'
import ReactChartkick, {BarChart} from 'react-chartkick'

ReactChartkick.addAdapter(Chart)

const testdata = [["X-Small", 5], ["Small", 27], ...]

class Fast extends Component {
    render () {
        return (
            <main>
                <h2>Fast</h2>

                {/* TODO: Fasting timer */}

                {/* TODO: Fasting charts */}
                <BarChart data={testdata} min{0} max={23}/>

            </main>
        )
    }
}

export default Fast
