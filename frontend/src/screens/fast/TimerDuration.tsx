import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { timeDifference } from '../../lib/timeConversion'
import TimerCircles from './TimerCircles'

interface ITimerDuration {
    activeFast: {
        startDate: string
        endDate: string
        duration: {
            days: string
            hours: string
            minutes: string
            seconds: string
        }
    }
}

const TimerDuration: React.FC<ITimerDuration> = ({ activeFast }) => {
    const { startDate } = activeFast

    const [endDate, setEndDate] = useState<string | Date>(activeFast ? activeFast.endDate : '')
    const [duration, setDuration] = useState<object | number | null>(
        activeFast ? activeFast.duration : {}
    )

    useEffect(() => {
        const timerControl = () => {
            const end = new Date()
            setEndDate(end)
            const timeDiff = timeDifference(new Date(startDate), end)
            setDuration(timeDiff)
        }

        const interval = setInterval(() => timerControl(), 1000)

        return () => clearInterval(interval)
    }, [startDate])

    const { days, hours, minutes, seconds } = duration
    const children = duration === 0 ? '00:00:00' : `${hours}:${minutes}:${seconds}`

    return <TimerCircles duration={duration} />
}

TimerDuration.propTypes = {
    activeFast: PropTypes.object.isRequired,
}

export default TimerDuration
