import React, { Component } from 'react'
import styled from 'styled-components'
import { useMutation } from '@apollo/react-hooks'
import timeConversion from '../lib/timeConversion'
import playIcon from '../static/icons/play.svg'
import stopIcon from '../static/icons/stop.svg'
import tomato from '../static/icons/tomato.svg'

// import { ALL_FASTS_QUERY } from '../gql/FastQuery'
import { CREATE_FAST_MUTATION, STOP_FAST_MUTATION } from '../gql/FastMutation'

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
        fast: {
            days: '00',
            hours: '00',
            minutes: '00',
            seconds: '00',
        },
    }

    componentDidMount = () => {
        let { startDate } = this.props.activeFast
        const { id, endDate, isActive } = this.props.activeFast
        startDate = new Date(startDate)
        this.setState({ id, startDate, endDate: Date.now(), isActive })
        this.interval = setInterval(() => this.timerControl(), 1000)
        // localStorage.setItem('startDate', startDate)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    timerControl = () => {
        const { startDate, endDate } = this.state
        const duration = timeConversion(startDate, new Date(endDate))

        this.setState({
            endDate: new Date(),
            fast: {
                days: duration.days,
                hours: duration.hours,
                minutes: duration.minutes,
                seconds: duration.seconds,
            },
        })
    }

    // refetchQueries: ['getRocketInventory']

    startFast = () => {
        const startDate = Date.now()
        this.setState({ timerActive: true, startDate })
        this.interval = setInterval(() => this.timerControl(), 1000)
        // localStorage.setItem('startDate', startDate)

        // FIX: hook call
        // const [createFast, { error, data }] = useMutation(CREATE_FAST_MUTATION, {
        //     variables: { startDate: new Date(), isActive: true },
        // })
    }

    stopFast = () => {
        if (window.confirm('Stop fasting period?')) {
            const { id } = this.state
            const endDate = Date.now()

            this.setState({
                startDate: '',
                endDate: '',
                timerActive: false,
                fast: {
                    milliseconds: '00',
                    days: '00',
                    hours: '00',
                    minutes: '00',
                    seconds: '00',
                },
            })
            clearInterval(this.interval)
            // localStorage.removeItem('startDate')

            // FIX: hook call
            // const [stopFast, { error, data }] = useMutation(STOP_FAST_MUTATION, {
            //     variables: { id },
            // })
        }
    }

    render() {
        const { fast, timerActive } = this.state
        const startStopIcon = timerActive === false ? playIcon : stopIcon

        return (
            <ContainerStyles className='container'>
                <div className='container__header'>
                    <img src={tomato} alt='Pomodoro Clock' className='container__header__icon' />
                </div>

                <div className='container__timer'>
                    <p className='container__timer__time-left'>
                        {fast.days > 0 && fast.days}
                        {fast.days > 0 && ':'}
                        {fast.hours}:{fast.minutes}:{fast.seconds}
                    </p>
                </div>

                <div className='container__buttons'>
                    <ButtonStyles
                        className='container__buttons__button'
                        onClick={!timerActive ? this.startFast : e => this.stopFast(e)}
                    >
                        <img
                            src={startStopIcon}
                            alt='startStopIcon'
                            className='container__buttons__button__icon'
                        />
                    </ButtonStyles>
                </div>
            </ContainerStyles>
        )
    }
}

export default FastTimer
