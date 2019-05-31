import React, { useState, useEffect, useContext, useMemo } from 'react'
import { Mutation } from 'react-apollo'
import styled from 'styled-components'
import { PropTypes } from 'prop-types'
import { CREATE_FAST_MUTATION, STOP_FAST_MUTATION } from '../gql/FastMutation'
import playIcon from '../static/icons/play.svg'
import stopIcon from '../static/icons/stop.svg'
import tomato from '../static/icons/tomato.svg'
import { FastsContext } from '../data/FastsContext'
import Error from './ErrorMessage'
import { timeConversion, timeDifference } from '../lib/timeConversion'
import { CURRENT_USER_QUERY } from '../gql/UserQuery'
import { ALL_FASTS_QUERY } from '../gql/FastQuery'

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
        margin-bottom: 16px;

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

const TimerIcon = () => (
    <div className='container__header'>
        <img src={tomato} alt='Pomodoro Clock' className='container__header__icon' />
    </div>
)

const StartButton = ({ setId, setStartDate, setIsActive, setDuration }) => (
    <Mutation mutation={CREATE_FAST_MUTATION} variables={{ startDate: new Date(), isActive: true }}>
        {(createFast, { error, loading }) => {
            // if (loading) console.log(`CREATING FAST`)
            if (error) return <Error error={error} />

            return (
                <div className='container__buttons'>
                    <ButtonStyles
                        className='container__buttons__button'
                        onClick={async () => {
                            await createFast().then(res => {
                                // console.log(`1. StartButton: ${Object.keys(res.data.createFast)}`)
                                setId(res.data.createFast.id)
                                setStartDate(new Date())
                            })
                            setIsActive(true)
                            setDuration(0)
                        }}
                    >
                        <img
                            src={playIcon}
                            alt='startStopIcon'
                            className='container__buttons__button__icon'
                        />
                    </ButtonStyles>
                </div>
            )
        }}
    </Mutation>
)

StartButton.propTypes = {
    setId: PropTypes.func.isRequired,
    setStartDate: PropTypes.func.isRequired,
    setIsActive: PropTypes.func.isRequired,
    setDuration: PropTypes.func.isRequired,
}

const StopButton = ({ id, setId, setStartDate, setEndDate, setDuration, setIsActive }) => (
    <Mutation
        mutation={STOP_FAST_MUTATION}
        variables={{ id }}
        refetchQueries={[{ query: ALL_FASTS_QUERY }]}
    >
        {(stopFast, { error, loading }) => {
            if (error) return <Error error={error} />

            return (
                <div className='container__buttons'>
                    <ButtonStyles
                        className='container__buttons__button'
                        onClick={async () => {
                            await stopFast()
                            // .then(res => {
                            // console.log(`1. StopButton : ${Object.keys(res.data.stopFast)}`)
                            // setEndDate(res.data.stopFast.endDate)
                            // })
                            setId('')
                            setStartDate('')
                            setEndDate('')
                            setDuration(0)
                            setIsActive(false)
                        }}
                    >
                        <img
                            src={stopIcon}
                            alt='startStopIcon'
                            className='container__buttons__button__icon'
                        />
                    </ButtonStyles>
                </div>
            )
        }}
    </Mutation>
)

StopButton.propTypes = {
    id: PropTypes.string.isRequired,
    setId: PropTypes.func.isRequired,
    setStartDate: PropTypes.func.isRequired,
    setEndDate: PropTypes.func.isRequired,
    setIsActive: PropTypes.func.isRequired,
    setDuration: PropTypes.func.isRequired,
}

const TimerDuration = props => {
    const { duration } = props
    // const duration = localStorage.getItem('duration')
    // const timer = timeConversion(duration)
    const timer = duration
    console.log(`TimerDuration: ${Object.entries(duration)}`)

    return (
        <div className='container__timer'>
            <p className='container__timer__time-left'>
                {timer.days > 0 && timer.days}
                {timer.days > 0 && ':'}
                {timer.hours}:{timer.minutes}:{timer.seconds}
            </p>
        </div>
    )
}

const FastTimer = props => {
    // const { activeFast } = useContext(FastsContext)
    const { activeFast } = props

    const [id, setId] = useState(activeFast ? activeFast.id : '')
    const [startDate, setStartDate] = useState(activeFast ? activeFast.startDate : '')
    const [endDate, setEndDate] = useState(activeFast ? activeFast.endDate : '')
    const [isActive, setIsActive] = useState(activeFast ? activeFast.isActive : false)
    const [duration, setDuration] = useState(activeFast ? activeFast.duration : 0)

    // Initial setup
    /* eslint-disable */
    useEffect(() => {
        if (activeFast) {
            console.log('1. useEffect called: ')
            setId(activeFast.id)
            setStartDate(new Date(activeFast.startDate))
            setIsActive(activeFast.isActive)
            setDuration(activeFast.duration)
            localStorage.setItem('duration', activeFast.duration)
        }
    }, [])
    /* eslint-enable */

    /* eslint-disable */
    useEffect(() => {
        const timerControl = () => {
            const d = timeDifference(startDate, new Date(endDate))
            // console.log(`DURATION: ${Object.entries(d)}`)

            setEndDate(new Date())
            setDuration(d)
        }

        // const interval = setInterval(() => timerControl(), 1000)
        // return () => clearInterval(interval)
    }, [])
    /* eslint-enable */

    return (
        <ContainerStyles className='container'>
            <TimerIcon />

            {!isActive ? <h2>Start fast</h2> : <TimerDuration duration={duration} />}

            {!isActive ? (
                <StartButton
                    setId={setId}
                    setStartDate={setStartDate}
                    setIsActive={setIsActive}
                    setDuration={setDuration}
                    // startFast={startFast}
                />
            ) : (
                <StopButton
                    id={id}
                    setId={setId}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                    setIsActive={setIsActive}
                    setDuration={setDuration}
                    // stopFast={this.endFast}
                />
            )}
        </ContainerStyles>
    )
}

export default FastTimer
