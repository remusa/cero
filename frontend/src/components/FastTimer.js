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
                max-width: 60px;
                max-width: 60px;
            }
        }
    }

    @media all and (max-width: 500px) {
        justify-content: center;
        align-items: center;

        .container__buttons__button {
            width: 100px;
            height: 100px;

            &__icon {
                max-width: 40px;
                max-height: 40px;
            }
        }
    }
`

const ButtonStyles = styled.button`
    background-image: linear-gradient(
        98.88deg,
        var(--color-primary-lighter) 0,
        var(--color-primary) 52.08%,
        var(--color-primary-darker) 100%
    );
    box-shadow: 0 0 20px var(--color-primary-lighter);
    border-radius: 50%;
    margin: auto;
    padding: 16px; /* 17px 0 */
    font-size: 1rem; /* 1.6rem */
    line-height: 1rem; /* 20px */
    color: var(--color-white);
    border: none;
    outline: 0;
    display: block;
    transition: background-image 0.3s;
    cursor: pointer;
    width: 160px;
    height: 160px;
    text-align: center;

    &:hover,
    &:active {
        box-shadow: 0 0 20px var(--color-primary-darker);
        background-image: linear-gradient(
            45deg,
            var(--color-primary-lighter) 0,
            var(--color-primary-darker) 100%
        );
    }
`

// TODO: refactor to use hooks
class FastTimer extends Component {
    state = {
        timerActive: '',
        startDate: new Date('2019-05-11T03:0:55.986Z'),
        endDate: null,
        fast: {
            milliseconds: '00',
            days: '00',
            hours: '00',
            minutes: '00',
            seconds: '00',
        },
    }

    componentDidMount = () => {
        // this.interval = setInterval(() => this.setState({ endDate: Date.now() }), 1000)
        const { timerActive, startDate } = this.state
        // if (timerActive === 'started') {
        const endDate = Date.now()
        this.setState({ endDate })
        this.interval = setInterval(() => this.timerControl(), 1000)
        // }
        localStorage.setItem('startDate', startDate)
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
            milliseconds: diffMs,
            days: diffDays,
            hours: diffHrs < 10 ? `0${diffHrs}` : diffHrs,
            minutes: diffMins < 10 ? `0${diffMins}` : diffMins,
            seconds: diffSecs < 10 ? `0${diffSecs}` : diffSecs,
        }
    }

    timerControl = () => {
        const { startDate, endDate } = this.state
        const timeConversion = this.timeConversion(startDate, endDate)

        this.setState({
            endDate: Date.now(),
            fast: {
                milliseconds: timeConversion.milliseconds,
                days: timeConversion.days,
                hours: timeConversion.hours,
                minutes: timeConversion.minutes,
                seconds: timeConversion.seconds,
            },
        })
    }

    startFast = () => {
        const startDate = Date.now()
        this.setState({ timerActive: true, startDate })
        this.interval = setInterval(() => this.timerControl(), 1000)
        localStorage.setItem('startDate', startDate)
    }

    stopFast = e => {
        if (window.confirm('Stop fasting period?')) {
            const endDate = Date.now()
            this.setState({
                timerActive: false,
                startDate: '',
                endDate,
                fast: {
                    milliseconds: '00',
                    days: '00',
                    hours: '00',
                    minutes: '00',
                    seconds: '00',
                },
            })
            clearInterval(this.interval)
        }
    }

    render() {
        const { fast, timerActive } = this.state
        const startStopIcon = timerActive === false ? playIcon : stopIcon

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
                        onClick={timerActive === false ? this.startFast : e => this.stopFast(e)}>
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
