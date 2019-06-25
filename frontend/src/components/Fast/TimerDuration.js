import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import { timeDifference } from '../../lib/timeConversion'
import TimerCircles from './TimerCircles'

const TimerDuration = props => {
    const { activeFast } = props
    const { startDate } = activeFast

    const [endDate, setEndDate] = useState(activeFast ? activeFast.endDate : '')
    const [duration, setDuration] = useState(activeFast ? activeFast.duration : '')
    

    useEffect(() => {
        const timerControl = () => {
            const end = new Date()
            setEndDate(end)
            const d = timeDifference(new Date(startDate), end)
            setDuration(d)
        }

        const interval = setInterval(() => timerControl(), 1000)

        return () => clearInterval(interval)
    }, [])

    let { days, hours, minutes, seconds } = duration
    const children = duration === 0 ? '00:00:00' : `${hours}:${minutes}:${seconds}`

    return (
        <div className='container__timer'>
            {/* <p className='container__timer__time-left'>
                {days > 0 && `${days}:`}
                {children}
            </p> */}

            <TimerCircles days={days} hours={hours} minutes={minutes} seconds={seconds} />
        </div>
    )
}

TimerDuration.propTypes = {
    activeFast: PropTypes.object.isRequired,
}

export default TimerDuration
