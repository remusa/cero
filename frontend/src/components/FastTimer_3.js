import React, { Component } from 'react'
import styled from 'styled-components'
import { Mutation } from 'react-apollo'
import { useMutation } from '@apollo/react-hooks'
import { adopt } from 'react-adopt'
import timeConversion from '../lib/timeConversion'
import playIcon from '../static/icons/play.svg'
import stopIcon from '../static/icons/stop.svg'
import tomato from '../static/icons/tomato.svg'
import Error from './ErrorMessage'

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

const TimerIcon = () => (
    <div className='container__header'>
        <img src={tomato} alt='Pomodoro Clock' className='container__header__icon' />
    </div>
)

const StartButton = ({ startDate }) => {
    console.log(`startDate: ${startDate}`)

    return (
        <Mutation mutation={CREATE_FAST_MUTATION} variables={{ startDate, isActive: true }}>
            {(createFast, { error, loading }) => {
                if (loading) console.log(`CREATING FAST`)
                if (error) return <Error error={error} />
                console.log('FAST CREATED')

                return (
                    <div className='container__buttons'>
                        <ButtonStyles
                            className='container__buttons__button'
                            onClick={async () => {
                                await createFast()
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
}

const StopButton = ({ id }) => (
    <Mutation mutation={STOP_FAST_MUTATION} variables={{ id }}>
        {(stopFast, { error, loading, data }) => {
            if (loading) console.log(`STOPPING FAST : ${id}`)
            if (error) return <Error error={error} />

            return (
                <div className='container__buttons'>
                    <ButtonStyles
                        className='container__buttons__button'
                        onClick={async () => {
                            await stopFast()
                            console.log(`STOPPING FAST: ${data}`)
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

/* eslint-disable */
// const Composed = adopt({
//     createFast: ({ render }) => <Mutation mutation={CREATE_FAST_MUTATION} variables={}>{render}</Mutation>,
//     stopFast: ({ render }) => <Mutation mutation={STOP_FAST_MUTATION}>{render}</Mutation>,
// })
/* eslint-enable */

/*
    <Composed>
        {({ user, toggleCart, localState }) => {
        const me = user.data.me;
        if (!me) return null;
            return (
            );
        }}
  </Composed>
*/

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

        // this.interval = setInterval(() => this.timerControl(), 1000)
        // localStorage.setItem('startDate', startDate)
    }

    // componentWillUnmount() {
    //     clearInterval(this.interval)
    // }

    // timerControl = () => {
    //     const { startDate, endDate } = this.state
    //     const duration = timeConversion(startDate, new Date(endDate))

    //     this.setState({
    //         endDate: new Date(),
    //         fast: {
    //             days: duration.days,
    //             hours: duration.hours,
    //             minutes: duration.minutes,
    //             seconds: duration.seconds,
    //         },
    //     })
    // }

    // refetchQueries: ['getRocketInventory']

    // startFast = () => {
    //     const startDate = Date.now()
    //     this.setState({ timerActive: true, startDate })
    //     clearInterval(this.interval)
    //     this.interval = setInterval(() => this.timerControl(), 1000)
    //     // localStorage.setItem('startDate', startDate)

    //     // TODO: hook call
    //     // const [createFast, { error, data }] = useMutation(CREATE_FAST_MUTATION, {
    //     //     variables: { startDate: new Date(), isActive: true },
    //     // })
    // }

    // endFast = () => {
    //     if (window.confirm('Stop fasting period?')) {
    //         const { id } = this.state
    //         const endDate = Date.now()

    //         this.setState({
    //             startDate: '',
    //             endDate: '',
    //             timerActive: false,
    //             fast: {
    //                 milliseconds: '00',
    //                 days: '00',
    //                 hours: '00',
    //                 minutes: '00',
    //                 seconds: '00',
    //             },
    //         })
    //         clearInterval(this.interval)
    //         // localStorage.removeItem('startDate')

    //         // TODO: hook call
    //         // const [stopFast, { error, data }] = useMutation(STOP_FAST_MUTATION, {
    //         //     variables: { id },
    //         // })
    //     }
    // }

    render() {
        const { id, startDate, fast, timerActive } = this.state
        const startStopIcon = timerActive === false ? playIcon : stopIcon

        return (
            <ContainerStyles className='container'>
                <TimerIcon />

                <div className='container__timer'>
                    <p className='container__timer__time-left'>
                        {fast.days > 0 && fast.days}
                        {fast.days > 0 && ':'}
                        {fast.hours}:{fast.minutes}:{fast.seconds}
                    </p>
                </div>

                <StopButton
                    id={id}
                    // stopFast={this.endFast}
                />
            </ContainerStyles>
        )
    }
}

export default FastTimer
