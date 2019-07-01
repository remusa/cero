import React, { useContext, useEffect, useState } from 'react'
import { PropTypes } from 'prop-types'
import { useMutation } from '@apollo/react-hooks'
import styled from 'styled-components'
import { addHours, format } from 'date-fns'
import { FastsContext } from '../../data/FastsContext'
import { UserContext } from '../../data/UserContext'
import { CREATE_FAST_MUTATION, STOP_FAST_MUTATION } from '../../gql/FastMutation'
import { ALL_FASTS_QUERY } from '../../gql/FastQuery'
import { timeDifference } from '../../lib/timeConversion'
import playIcon from '../../static/icons/play.svg'
import stopIcon from '../../static/icons/stop.svg'
import tomato from '../../static/icons/tomato.svg'
import Error from '../ErrorMessage'
import TimerDuration from './TimerDuration'

const ContainerStyles = styled.div`
    display: flex;
    flex-flow: column wrap;
    justify-content: flex-start;
    align-items: center;

    text-align: center;

    .container__header {
        &__icon {
            max-width: 75px;
        }
    }

    .container__timer {
        line-height: 1;
        margin: 4px;
        margin-bottom: 16px;

        border-radius: 4px;
        box-shadow: 0 0 8px var(--color-grey);

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

    &__stop {
        background-image: linear-gradient(98.88deg, white 0, red 52.08%, black 100%);
    }

    &:hover,
    &:active {
        box-shadow: 0 0 20px var(--color-primary-darker);
        background-image: linear-gradient(
            45deg,
            var(--color-primary-lighter) 0,
            var(--color-primary-darker) 100%
        );
    }

    @media all and (max-width: 500px) {
        width: 120px;
        height: 120px;
    }
`

const TimerIcon = () => (
    <div className='container__header'>
        <img src={tomato} alt='Pomodoro Clock' className='container__header__icon' />
    </div>
)

const StartButton = ({ setId, setStartDate, setIsActive, setDuration }) => {
    const [createFast, { error, loading }] = useMutation(CREATE_FAST_MUTATION, {
        variables: { startDate: new Date(), isActive: true },
        refetchQueries: [{ query: ALL_FASTS_QUERY }],
    })

    if (error) return <Error error={error} />

    return (
        <div className='container__buttons'>
            <ButtonStyles
                className='container__buttons__button'
                onClick={async () => {
                    await createFast().then(res => {
                        setId(res.data.createFast.id)
                    })
                    setIsActive(true)
                    setDuration(0)
                    setStartDate(new Date())
                    localStorage.setItem('active', true)
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
}

StartButton.propTypes = {
    setId: PropTypes.func.isRequired,
    setStartDate: PropTypes.func.isRequired,
    setIsActive: PropTypes.func.isRequired,
    setDuration: PropTypes.func.isRequired,
}

const StopButton = ({ id, setId, setStartDate, setEndDate, setDuration, setIsActive }) => {
    const [stopFast, { error, loading }] = useMutation(STOP_FAST_MUTATION, {
        variables: { id },
        refetchQueries: [{ query: ALL_FASTS_QUERY }],
    })

    if (error) return <Error error={error} />

    return (
        <div className='container__buttons'>
            <ButtonStyles
                className='container__buttons__button__stop'
                onClick={async () => {
                    await stopFast()
                    setId('')
                    setStartDate('')
                    setEndDate('')
                    setDuration(0)
                    setIsActive(false)
                    localStorage.setItem('active', false)
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
}

StopButton.propTypes = {
    id: PropTypes.string.isRequired,
    setId: PropTypes.func.isRequired,
    setStartDate: PropTypes.func.isRequired,
    setEndDate: PropTypes.func.isRequired,
    setIsActive: PropTypes.func.isRequired,
    setDuration: PropTypes.func.isRequired,
}

const FastTimer = props => {
    const { activeFast } = useContext(FastsContext)
    const { user } = useContext(UserContext)

    const [id, setId] = useState(activeFast ? activeFast.id : '')
    const [startDate, setStartDate] = useState(activeFast ? activeFast.startDate : '')
    const [endDate, setEndDate] = useState(activeFast ? activeFast.endDate : '')
    const [isActive, setIsActive] = useState(activeFast ? activeFast.isActive : false)
    const [duration, setDuration] = useState(activeFast ? activeFast.duration : '')

    /* eslint-disable */
    useEffect(() => {
        if (activeFast) {
            setId(activeFast.id)
            setStartDate(activeFast.startDate)
            setEndDate(activeFast.endDate)
            setIsActive(activeFast.isActive)
            setDuration(activeFast.duration)
        }
    }, [activeFast])
    /* eslint-enable */

    const estimatedEndDate = format(
        new Date(addHours(startDate, user.goal)),
        'dddd DD/MMM hh:mm aa'
    )

    return (
        <ContainerStyles className='container'>
            {!isActive && <TimerIcon />}

            {!isActive ? (
                <h2>Start fast</h2>
            ) : (
                <h2>
                    Goal ({user.goal} hours): {estimatedEndDate}
                </h2>
            )}

            {activeFast && isActive && <TimerDuration activeFast={activeFast} />}

            {!isActive ? (
                <StartButton
                    setId={setId}
                    setStartDate={setStartDate}
                    setIsActive={setIsActive}
                    setDuration={setDuration}
                />
            ) : (
                <StopButton
                    id={id}
                    setId={setId}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                    setIsActive={setIsActive}
                    setDuration={setDuration}
                />
            )}
        </ContainerStyles>
    )
}

export default FastTimer
