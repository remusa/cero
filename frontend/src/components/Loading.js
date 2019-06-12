import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { css } from '@emotion/core'
import { DotLoader } from 'react-spinners'

const override = css`
    display: block;
    margin: 0 auto;
    border-color: var(--color-primary-darker);
`

const ContainerStyles = styled.div`
    height: 100%;
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;
`

const StyledP = styled.p`
    text-align: center;
    font-size: 18px;
    font-weight: 600;
    color: var(--color-primary-darker);
`

class Loading extends Component {
    state = {
        text: this.props.text,
        speed: this.props.speed,
        loading: true,
    }

    componentDidMount() {
        const stopper = `${this.props.text}...`
        const { text, speed } = this.state

        this.interval = window.setInterval(() => {
            if (text === stopper) {
                this.setState({
                    text: this.props.text,
                })
            } else {
                this.setState({
                    text: text.concat('.'),
                })
            }
        }, speed)
    }

    componentWillUnmount() {
        if (this.interval) {
            window.clearInterval(this.interval)
        }
    }

    render() {
        const { text, loading } = this.state

        return (
            <ContainerStyles>
                <div className='sweet-loading'>
                    <DotLoader
                        css={override}
                        sizeUnit='px'
                        size={100}
                        // height={8}
                        color='var(--color-primary-darker)'
                        loading={loading}
                    />
                </div>

                <StyledP>{text}</StyledP>
            </ContainerStyles>
        )
    }
}

Loading.defaultProps = {
    text: 'Loading',
    speed: 300,
}

Loading.propTypes = {
    text: PropTypes.string.isRequired,
    speed: PropTypes.number.isRequired,
}

export default Loading
