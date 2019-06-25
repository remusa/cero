import React from 'react'
import PropTypes from 'prop-types'
import FastTimerCircles from './FastTimerCircles'

const TimerDuration = props => {
    const { duration: timer } = props
    const { days, hours, minutes, seconds } = timer

    const children = timer === 0 ? '00:00:00' : `${hours}:${minutes}:${seconds}`


    return (
        <div className='container__timer'>
            {/* <p className='container__timer__time-left'>
                {days > 0 && `${days}:`}
                {children}
            </p> */}

            <FastTimerCircles days={days} hours={hours} minutes={minutes} seconds={seconds} />
        </div>
    )
}

TimerDuration.propTypes = {
    duration: PropTypes.any.isRequired,
}

export default TimerDuration
