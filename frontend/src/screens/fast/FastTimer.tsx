import { useMutation } from '@apollo/react-hooks'
import { addHours, format } from 'date-fns'
import { PropTypes } from 'prop-types'
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import Error from '../../components/ErrorMessage'
import { FastsContext } from '../../data/FastsContext'
import { UserContext } from '../../data/UserContext'
import { CREATE_FAST_MUTATION, STOP_FAST_MUTATION } from '../../gql/FastMutation'
import { ALL_FASTS_QUERY } from '../../gql/FastQuery'
import playIcon from '../../static/icons/play.svg'
import stopIcon from '../../static/icons/stop.svg'
import tomato from '../../static/icons/tomato.svg'
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

    @media all and (max-width: 800px) {
        margin-bottom: 16px;
    }

    @media all and (max-width: 500px) {
        justify-content: center;
        align-items: center;

        .container__buttons__button {
            width: 120px;
            height: 120px;

            &__icon {
                max-width: 50px;
                max-height: 50px;
            }
        }
    }
`

const ButtonStyles = styled.button`
    background-image: linear-gradient(
        98.88deg,
        ${props => props.theme.colorPrimaryLighter} 0,
        ${props => props.theme.colorPrimary} 52.08%,
        ${props => props.theme.colorPrimaryDarker} 100%
    );
    box-shadow: 0 0 20px ${props => props.theme.colorPrimaryLighter};
    border-radius: 50%;
    margin: auto;
    padding: 16px; /* 17px 0 */
    font-size: 1rem; /* 1.6rem */
    line-height: 1rem; /* 20px */
    color: ${props => props.theme.colorWhite};
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
        box-shadow: 0 0 20px ${props => props.theme.colorPrimaryDarker};
        background-image: linear-gradient(
            45deg,
            ${props => props.theme.colorPrimaryLighter} 0,
            ${props => props.theme.colorPrimaryDarker} 100%
        );
    }

    @media all and (max-width: 500px) {
        width: 120px;
        height: 120px;
    }
`

const TimerIcon: React.FC = () => (
    <div className="container__header">
        <img src={tomato} alt="Pomodoro Clock" className="container__header__icon" />
    </div>
)

interface IStartButton {
    id: string
    setId: React.Dispatch<React.SetStateAction<string>>
    setStartDate: React.Dispatch<React.SetStateAction<string | Date>>
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>
    setDuration: React.Dispatch<React.SetStateAction<string | number>>
}

const StartButton: React.FC<IStartButton> = ({ setId, setStartDate, setIsActive, setDuration }) => {
    const [createFast, { error, loading }] = useMutation(CREATE_FAST_MUTATION, {
        variables: { startDate: new Date(), isActive: true },
        refetchQueries: [{ query: ALL_FASTS_QUERY }],
    })

    if (error) return <Error error={error} />

    return (
        <div className="container__buttons">
            <ButtonStyles
                className="container__buttons__button"
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
                    alt="startStop-icon"
                    className="container__buttons__button__icon"
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

interface IStopButton extends IStartButton {
    setEndDate: React.Dispatch<React.SetStateAction<string| Date>>
}

const StopButton: React.FC<IStopButton> = ({
    id,
    setId,
    setStartDate,
    setEndDate,
    setDuration,
    setIsActive,
}) => {
    const [stopFast, { error, loading }] = useMutation(STOP_FAST_MUTATION, {
        variables: { id },
        refetchQueries: [{ query: ALL_FASTS_QUERY }],
    })

    if (error) return <Error error={error} />

    return (
        <div className="container__buttons">
            <ButtonStyles
                className="container__buttons__button"
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
                    alt="startStopIcon"
                    className="container__buttons__button__icon"
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

const FastTimer: React.FC = () => {
    const { activeFast } = useContext(FastsContext)
    const { user } = useContext(UserContext)

    const [id, setId] = useState(activeFast ? activeFast.id : '')
    const [startDate, setStartDate] = useState<string | Date> (activeFast ? activeFast.startDate : '')
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
        <ContainerStyles className="container">
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
