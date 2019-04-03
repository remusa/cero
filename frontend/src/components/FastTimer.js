import React, { Component } from 'react'
import PropTypes from 'prop-types'

import tomato from '../assets/tomato.svg'
import playIcon from '../assets/play.svg'
import pauseIcon from '../assets/pause.svg'
// import stopIcon from '../assets/stop.svg'
import repeatIcon from '../assets/repeat.svg'
import upIcon from '../assets/up-arrow.svg'
import downIcon from '../assets/down-arrow.svg'

const Button = props => (
    <button id={props.id} className="button" onClick={props.onClick}>
        <img src={props.icon} alt={props.id} className="icon" />
    </button>
)

Button.propTypes = {
    id: PropTypes.string.isRequired,
}

const Label = props => (
    <div id={props.label} className="container__length__label">
        <h3>{props.name}</h3>
        <div className="container__length__label__children">{props.children}</div>
    </div>
)

Label.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
}

const initialState = {
    timer: 0,
    timerState: 'stopped',
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

        // stopped
        if (timerState === 'stopped') {
            this.beginCountDown()
            this.setState({ timerState: 'running' })
        }
        // running
        else {
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

        let minutes = Math.floor(timer / 60)
        let seconds = timer - minutes * 60

        seconds = seconds < 10 ? `0${seconds}` : seconds
        minutes = minutes < 10 ? `0${minutes}` : minutes

        return `${minutes}:${seconds}`
    }

    render() {
        const { timerState } = this.state
        let playPauseIcon = timerState === 'stopped' ? playIcon : pauseIcon

        return (
            <div className="container">
                <div className="container__header">
                    <img src={tomato} alt="Pomodoro Clock" className="icon-header" />
                </div>

                <div className="container__session">
                    <div id="time-left">{this.clockify()}</div>
                </div>

                <div className="container__buttons">
                    <Button id="start_stop" icon={playPauseIcon} onClick={this.timerControl} />
                    <Button id="reset" icon={repeatIcon} onClick={this.handleReset} />
                </div>

                <audio
                    id="beep"
                    preload="auto"
                    src="https://goo.gl/65cBl1"
                    ref={audio => {
                        this.audioBeep = audio
                    }}
                />
            </div>
        )
    }
}

export default FastTimer
