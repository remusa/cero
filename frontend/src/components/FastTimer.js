import React, { Component } from 'react'
import styled from 'styled-components'
import tomato from '../static/icons/tomato.svg'
import playIcon from '../static/icons/play.svg'
import stopIcon from '../static/icons/stop.svg'

const ContainerStyles = styled.div`
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .container__header {
        &__icon {
            max-width: 75px;
        }
    }

    .container__timer {
        line-height: 1;
        margin: 4px;

        &__time-left {
            font-size: 2.5rem;
        }
    }

    .container__buttons {
        display: flex;
        justify-content: space-between;
        align-items: center;

        &__button {
            &__icon {
                max-width: 40px;
            }
        }
    }
`

const ButtonStyles = styled.button`
    /* padding: 4px;
    border: 4px solid transparent;
    border-radius: 3px;
    background-color: transparent;
    transition: 0.2s; */

    /* background-image: linear-gradient(98.88deg, #ff00c7 0, #bd00ff 52.08%, #30f 100%);
    box-shadow: 0 0 20px rgba(112, 0, 255, 0.8); */
    background-image: linear-gradient(98.88deg, var(--color-primary-lighter) 0, var(--color-primary) 52.08%, var(--color-primary-darker) 100%);
    box-shadow: 0 0 20px rgba(112, 0, 255, 0.8);
    border-radius: 100px;
    padding: 8px 0; /* 17px 0 */
    font-size: 1rem; /* 1.6rem */
    line-height: 1rem; /* 20px */
    color: #fff;
    border: none;
    outline: 0;
    display: block;
    margin: auto;
    transition: background-image 0.3s;
    cursor: pointer;
    width: 160px; /* 320px */
    text-align: center;

    &:hover,
    &:active {
        /* border: 1px solid var(--color-primary); */
        /* background-color: var(--color-primary-lighter); */
    }
`

const initialState = {
    timer: 0,
    timerState: 'stopped',
    startDate: new Date('2019-05-11T03:0:55.986Z'),
    // startDate: new Date(),
    endDate: null,
    fast: {},
}

// TODO: refactor to use hooks
class FastTimer extends Component {
    state = initialState

    componentDidMount = () => {
        // this.interval = setInterval(() => this.setState({ endDate: Date.now() }), 1000)
        const endDate = new Date()
        this.setState({ endDate })
        this.interval = setInterval(() => this.startStopFast(), 1000)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    timeConversion = (startDate, endDate) => {
        const diffMs = Math.abs(endDate - startDate)
        const diffDays = Math.floor(diffMs / 86400000)
        const diffHrs = Math.floor((diffMs % 86400000) / 3600000)
        const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000)
        const diffSecs = Math.round(((((diffMs % 86400000) % 3600000) % 60000) % 60000) / 1000)

        return {
            days: diffDays,
            hours: diffHrs < 10 ? `0${diffHrs}` : diffHrs,
            minutes: diffMins < 10 ? `0${diffMins}` : diffMins,
            seconds: diffSecs < 10 ? `0${diffSecs}` : diffSecs,
        }
    }

    startStopFast = () => {
        const { startDate, endDate } = this.state
        const timeConversion = this.timeConversion(startDate, endDate)

        this.setState({
            endDate: Date.now(),
            fast: {
                days: timeConversion.days,
                hours: timeConversion.hours,
                minutes: timeConversion.minutes,
                seconds: timeConversion.seconds,
            },
        })
    }

    render() {
        const { fast, timerState } = this.state
        const startStopIcon = timerState === 'stopped' ? playIcon : stopIcon

        return (
            <ContainerStyles className="container">
                <div className="container__header">
                    <img src={tomato} alt="Pomodoro Clock" className="container__header__icon" />
                </div>

                <div className="container__timer">
                    <p className="container__timer__time-left">
                        {fast.hours}:{fast.minutes}:{fast.seconds}
                    </p>
                </div>

                <div className="container__buttons">
                    <ButtonStyles
                        className="container__buttons__button"
                        onClick={this.startStopFast}>
                        <img
                            src={startStopIcon}
                            alt="startStopIcon"
                            className="container__buttons__button__icon"
                        />
                    </ButtonStyles>
                </div>
            </ContainerStyles>
        )
    }
}

export default FastTimer
