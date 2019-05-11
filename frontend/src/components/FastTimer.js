import React, { Component } from 'react'
import styled from 'styled-components'
import tomato from '../static/icons/tomato.svg'
import playIcon from '../static/icons/play.svg'
import stopIcon from '../static/icons/stop.svg'
// import repeatIcon from '../static/icons/repeat.svg'
// import pauseIcon from '../static/icons/pause.svg'
// import upIcon from '../static/icons/up-arrow.svg'
// import downIcon from '../static/icons/down-arrow.svg'

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
    padding: 4px;
    border: 4px solid transparent;
    border-radius: 3px;
    background-color: transparent;
    transition: 0.2s;

    &:hover,
    &:active {
        /* border: 1px solid var(--color-primary); */
        background-color: var(--color-primary-lighter);
    }
`

const initialState = {
    timer: 0,
    timerState: 'stopped',
    startDate: new Date('2019-05-11T03:0:55.986Z'),
    endDate: null,
    fast: {},
}

class FastTimer extends Component {
    state = initialState

    handleReset = () => {
        this.setState(initialState)
        this.audioBeep.pause()
        this.audioBeep.currentTime = 0
        clearInterval(this.interval)
    }

    playAudio = () => {
        this.audioBeep.play()
    }

    timerControl = () => {
        const { timerState } = this.state
        if (timerState === 'stopped') {
            this.beginCountDown()
            this.setState({ timerState: 'running' })
        } else {
            this.setState({ timerState: 'stopped' })
            clearInterval(this.interval)
        }
    }

    beginCountDown = () => {
        const { timer } = this.state
        this.interval = setInterval(() => {
            this.incrementTimer()
        }, timer)
    }

    incrementTimer = () => {
        const { timer } = this.state
        this.setState({ timer: timer + 1 })
    }

    clockify = () => {
        const { timer } = this.state
        let hours = timer
        let minutes = Math.floor(timer / 60)
        let seconds = timer - minutes * 60
        seconds = seconds < 10 ? `0${seconds}` : seconds
        minutes = minutes < 10 ? `0${minutes}` : minutes
        return `${hours} hrs. : ${minutes} min : ${seconds} sec`
    }

    componentDidMount = () => {
        this.startStopFast()
    }

    startStopFast = () => {
        const { startDate } = this.state
        const endDate = new Date('2019-05-12T02:59:00')
        // const endDate = new Date()
        console.log(startDate, endDate)

        this.setState({ endDate })

        const diffMs = Math.abs(endDate - startDate)
        // const diffDays = Math.floor(diffMs / 86400000)
        const diffHrs = Math.floor((diffMs % 86400000) / 3600000)
        const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000)
        const diffSecs = Math.round((((diffMs % 86400000) % 3600000) % 60000) / 60000)

        console.log(`${diffHrs}:${diffMins}:${diffSecs}`)

        this.setState({
            fast: {
                hours: diffHrs,
                minutes: diffMins,
                seconds: diffSecs,
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
                        {/* {this.clockify()} */}
                        {fast.hours} hours {fast.minutes} minutes {fast.seconds} seconds
                    </p>
                </div>

                <div className="container__buttons">
                    <ButtonStyles
                        className="container__buttons__button"
                        onClick={this.startStopFast}>
                        {/* // onClick={this.timerControl}> */}
                        <img
                            src={startStopIcon}
                            alt="startStopIcon"
                            className="container__buttons__button__icon"
                        />
                    </ButtonStyles>

                    {/* <ButtonStyles className="container__buttons__button" onClick={this.handleReset}>
                        <img
                            src={repeatIcon}
                            alt="repeatIcon"
                            className="container__buttons__button__icon"
                        />
                    </ButtonStyles> */}
                </div>

                <audio
                    id="beep"
                    preload="auto"
                    src="https://goo.gl/65cBl1"
                    ref={audio => {
                        this.audioBeep = audio
                    }}
                />
            </ContainerStyles>
        )
    }
}

export default FastTimer
