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
import { timeConversion } from '../lib/timeConversion'

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

const TimerIcon = () => (
    <div className='container__header'>
        <img src={tomato} alt='Pomodoro Clock' className='container__header__icon' />
    </div>
)

const StartButton = ({ setId, setStartDate, setIsActive }) => (
    <Mutation mutation={CREATE_FAST_MUTATION} variables={{ startDate: new Date(), isActive: true }}>
        {(createFast, { error, loading }) => {
            if (loading) console.log(`CREATING FAST`)
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
}

const StopButton = ({ id, setIsActive, setEndDate }) => (
    <Mutation mutation={STOP_FAST_MUTATION} variables={{ id }}>
        {(stopFast, { error, loading }) => {
            if (error) return <Error error={error} />

            return (
                <div className='container__buttons'>
                    <ButtonStyles
                        className='container__buttons__button'
                        onClick={async () => {
                            await stopFast().then(res => {
                                // console.log(`1. StopButton : ${Object.keys(res.data.stopFast)}`)
                                setEndDate(res.data.stopFast.endDate)
                            })
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
    setIsActive: PropTypes.func.isRequired,
    setEndDate: PropTypes.func.isRequired,
}

const TimerDuration = ({ duration }) => {
    const converted = timeConversion(duration)
    // console.log('TimerDuration: ', converted)

    // const converted = {
    //     milliseconds: '00',
    //     days: '00',
    //     hours: '00',
    //     minutes: '00',
    //     seconds: '00',
    //     totalHours: '00',
    // }

    return (
        <div className='container__timer'>
            <p className='container__timer__time-left'>
                {duration.days > 0 && duration.days}
                {duration.days > 0 && ':'}
                {duration.hours}:{duration.minutes}:{duration.seconds}
            </p>
        </div>
    )
}

const FastTimer = props => {
    // const { activeFast } = useContext(FastsContext)
    const { activeFast } = props
    console.log('FastTimer: activeFast', activeFast)

    const [id, setId] = useState(activeFast ? activeFast.id : '')
    const [startDate, setStartDate] = useState(activeFast ? activeFast.startDate : '')
    const [endDate, setEndDate] = useState(activeFast ? activeFast.endDate : '')
    const [isActive, setIsActive] = useState(activeFast ? activeFast.isActive : false)
    const [duration, setDuration] = useState(activeFast ? activeFast.duration : 0)

    // Initial setup
    useEffect(() => {
        // console.log('1. useEffect called: ')

        if (activeFast) {
            setId(activeFast.id)
            setStartDate(new Date(activeFast.startDate))
            setIsActive(activeFast.isActive)
            setDuration(activeFast.duration)
            // console.log("useEffect: there's an active fast")
        } else {
            // console.log("useEffect: there isn't an active fast")
        }

        return () => {
            // clearInterval(this.interval)
        }
    }, [activeFast])

    // useEffect(() => {
    //     setEndDate(Date.now())
    // }, [])

    return (
        <ContainerStyles className='container'>
            <TimerIcon />

            <TimerDuration duration={duration} />

            {!isActive ? (
                <StartButton
                    setId={setId}
                    setStartDate={setStartDate}
                    setIsActive={setIsActive}
                    // startFast={startFast}
                />
            ) : (
                <StopButton
                    id={id}
                    setEndDate={setEndDate}
                    setIsActive={setIsActive}
                    // stopFast={this.endFast}
                />
            )}
        </ContainerStyles>
    )
}

export default FastTimer
