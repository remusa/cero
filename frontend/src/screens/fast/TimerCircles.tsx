import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { describeArc, mapNumber } from '../../lib/svgCircle'

const CountDownStyles = styled.div`
    --colorStroke: ${props => props.theme.colorPrimary};

    border-radius: 4px;
    /* box-shadow: 0 0 8px ${props => props.theme.colorGrey}; */
    box-shadow: 0 0 8px ${props => props.theme.boxShadow};
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

        /* color: #222; */
        color: ${props => props.theme.colorFont};
        font-size: 3rem;
        line-height: 30px;
        margin: 4px;
        padding: 4px;

        & span {
            /* color: #333; */
            color: ${props => props.theme.colorHeader};
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

interface ISVGCircle {
    radius: number
}

const SVGCircle: React.FC<ISVGCircle> = ({ radius }) => (
    <svg className="countdown-svg">
        <path
            fill="none"
            stroke="var(--colorStroke)"
            strokeWidth="4"
            d={describeArc(50, 50, 48, 0, radius)}
        />
    </svg>
)

SVGCircle.propTypes = {
    radius: PropTypes.number.isRequired,
}

interface ITimerCircles {
    duration: {
        days: number
        hours: number
        minutes: number
        seconds: number
    }
}

const TimerCircles: React.FC<ITimerCircles> = ({ duration }) => {
    const { days, hours, minutes, seconds } = duration

    const daysRadius: number = mapNumber(days, 30, 0, 0, 360)
    const hoursRadius: number = mapNumber(hours, 24, 0, 0, 360)
    const minutesRadius: number = mapNumber(minutes, 60, 0, 0, 360)
    const secondsRadius: number = mapNumber(seconds, 60, 0, 0, 360)

    if (!seconds) {
        return null
    }

    return (
        <CountDownStyles>
            <div className="countdown-container">
                {days > 0 && (
                    <div className="countdown-item">
                        <SVGCircle radius={daysRadius} />
                        {days}
                        <span>day{days > 1 && 's'}</span>
                    </div>
                )}

                {hours > 0 && (
                    <div className="countdown-item">
                        <SVGCircle radius={hoursRadius} />
                        {hours}
                        <span>hour{hours > 1 && 's'}</span>
                    </div>
                )}

                {minutes && (
                    <div className="countdown-item">
                        <SVGCircle radius={minutesRadius} />
                        {minutes}
                        <span>minute{minutes > 1 && 's'}</span>
                    </div>
                )}

                {seconds && (
                    <div className="countdown-item">
                        <SVGCircle radius={secondsRadius} />
                        {seconds}
                        <span>seconds</span>
                    </div>
                )}
            </div>
        </CountDownStyles>
    )
}

TimerCircles.propTypes = {
    duration: PropTypes.oneOfType([PropTypes.object.isRequired, PropTypes.number.isRequired]),
}

TimerCircles.defaultProps = {
    duration: {},
}

export default TimerCircles
