import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { polarToCartesian, describeArc, mapNumber } from '../lib/svgCircle'

const CountDownStyles = styled.div`
    .countdown-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
    }

    .countdown-item {
        color: #111;
        font-size: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-flow: column;
        line-height: 30px;
        margin: 10px;
        padding-top: 10px;
        position: relative;
        width: 100px;
        height: 100px;
    }

    .countdown-item span {
        color: #333;
        font-size: 12px;
        font-weight: 600;
        text-transform: uppercase;
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

const FastTimerCircles = ({ days, hours, minutes, seconds }) => {
    const daysRadius = mapNumber(days, 30, 0, 0, 360)
    const hoursRadius = mapNumber(hours, 24, 0, 0, 360)
    const minutesRadius = mapNumber(minutes, 60, 0, 0, 360)
    const secondsRadius = mapNumber(seconds, 60, 0, 0, 360)

    if (!seconds) {
        return null
    }

    return (
        <CountDownStyles>
            <div className='countdown-wrapper'>
                {days > 0 && (
                    <div className='countdown-item'>
                        <SVGCircle radius={daysRadius} />
                        {days}
                        <span>days</span>
                    </div>
                )}
                {hours && (
                    <div className='countdown-item'>
                        <SVGCircle radius={hoursRadius} />
                        {hours}
                        <span>hours</span>
                    </div>
                )}
                {minutes && (
                    <div className='countdown-item'>
                        <SVGCircle radius={minutesRadius} />
                        {minutes}
                        <span>minutes</span>
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

export default FastTimerCircles
