import React, { Component } from 'react'
import PropTypes from 'prop-types'

import tomato from '../static/icons/tomato.svg'
import playIcon from '../static/icons/play.svg'
import pauseIcon from '../static/icons/pause.svg'
// import stopIcon from '../static/icons/stop.svg'
import repeatIcon from '../static/icons/repeat.svg'
// import upIcon from '../static/icons/up-arrow.svg'
// import downIcon from '../static/icons/down-arrow.svg'

const Button = ({ id, onClick, icon }) => (
    <button type='button' id={id} className='button' onClick={onClick}>
        <img src={icon} alt={id} className='icon' />
    </button>
)

Button.propTypes = {
    id: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    icon: PropTypes.string.isRequired,
}

const Label = ({ label, name, children }) => (
    <div id={label} className='container__length__label'>
        <h3>{name}</h3>
        <div className='container__length__label__children'>{children}</div>
    </div>
)

Label.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
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

        let minutes = Math.floor(timer / 60)
        let seconds = timer - minutes * 60

        seconds = seconds < 10 ? `0${seconds}` : seconds
        minutes = minutes < 10 ? `0${minutes}` : minutes

        return `${minutes}:${seconds}`
    }

    render() {
        const { timerState } = this.state
        const playPauseIcon = timerState === 'stopped' ? playIcon : pauseIcon

        return (
            <div className='container'>
                <div className='container__header'>
                    <img src={tomato} alt='Pomodoro Clock' className='icon-header' />
                </div>

                <div className='container__session'>
                    <div id='time-left'>{this.clockify()}</div>
                </div>

                <div className='container__buttons'>
                    <Button id='start_stop' icon={playPauseIcon} onClick={this.timerControl} />
                    <Button id='reset' icon={repeatIcon} onClick={this.handleReset} />
                </div>

                <audio
                    id='beep'
                    preload='auto'
                    src='https://goo.gl/65cBl1'
                    ref={audio => {
                        this.audioBeep = audio
                    }}
                />
            </div>
        )
    }
}

export default FastTimer
