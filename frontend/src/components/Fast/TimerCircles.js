import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { describeArc, mapNumber } from '../../lib/svgCircle'

const CountDownStyles = styled.div`
    border-radius: 4px;
    box-shadow: 0 0 8px var(--color-grey);
    line-height: 1;
    padding: 8px;
    margin-bottom: 16px;

    @media all and (max-height: 800px) {
        margin-top: 0px;
        margin-left: 12px;
        margin-right: 12px;
    }

    &__time-left {
        font-size: 2.5rem;
    }

    .countdown-container {
        display: flex;
        flex-flow: row wrap;
        align-items: center;
        justify-content: center;
    }

    .countdown-item {
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;

        position: relative;
        width: 100px;
        height: 100px;

        color: #111;
        font-size: 3rem;
        line-height: 30px;
        margin: 4px;
        padding: 4px;

        & span {
            color: #333;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
        }

        @media all and (max-width: 500px) {
            /* margin-right: 30px;
            margin-left: 30px; */
        }
    }

    .countdown-svg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100px;
        height: 100px;
    }
`

const SVGCircle = ({ radius }) => (
    <svg className='countdown-svg'>
        <path
            fill='none'
            stroke='var(--color-primary)'
            strokeWidth='4'
            d={describeArc(50, 50, 48, 0, radius)}
        />
    </svg>
)

SVGCircle.propTypes = {
    radius: PropTypes.number.isRequired,
}

const FastTimerCircles = ({ duration }) => {
    const { days, hours, minutes, seconds } = duration

    const daysRadius = mapNumber(days, 30, 0, 0, 360)
    const hoursRadius = mapNumber(hours, 24, 0, 0, 360)
    const minutesRadius = mapNumber(minutes, 60, 0, 0, 360)
    const secondsRadius = mapNumber(seconds, 60, 0, 0, 360)

    if (!seconds) {
        return null
    }

    return (
        <CountDownStyles>
            <div className='countdown-container'>
                {days > 0 && (
                    <div className='countdown-item'>
                        <SVGCircle radius={daysRadius} />
                        {days}
                        <span>day{days > 1 && 's'}</span>
                    </div>
                )}

                {hours > 0 && (
                    <div className='countdown-item'>
                        <SVGCircle radius={hoursRadius} />
                        {hours}
                        <span>hour{hours > 1 && 's'}</span>
                    </div>
                )}

                {minutes && (
                    <div className='countdown-item'>
                        <SVGCircle radius={minutesRadius} />
                        {minutes}
                        <span>minute{minutes > 1 && 's'}</span>
                    </div>
                )}

                {seconds && (
                    <div className='countdown-item'>
                        <SVGCircle radius={secondsRadius} />
                        {seconds}
                        <span>seconds</span>
                    </div>
                )}
            </div>
        </CountDownStyles>
    )
}

FastTimerCircles.propTypes = {
    duration: PropTypes.object.isRequired,
}

export default FastTimerCircles
