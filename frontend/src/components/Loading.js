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
    static defaultProps = {
        text: 'Loading',
        speed: 300,
    }

    static propTypes = {
        text: PropTypes.string.isRequired,
        speed: PropTypes.number.isRequired,
    }

    state = {
        text: this.props.text,
        speed: this.props.speed,
        loading: true,
    }

    componentDidMount() {
        const stopper = `${this.props.text}...`

        this.interval = window.setInterval(() => {
            if (this.state.text === stopper) {
                this.setState({
                    text: this.props.text,
                })
            } else {
                this.setState({
                    text: this.state.text.concat('.'),
                })
            }
        }, this.state.speed)
    }

    componentWillUnmount() {
        if (this.interval) {
            window.clearInterval(this.interval)
        }
    }

    render() {
        return (
            <ContainerStyles>
                <div className='sweet-loading'>
                    <DotLoader
                        css={override}
                        sizeUnit='px'
                        size={100}
                        // height={8}
                        color='var(--color-primary-darker)'
                        loading={this.state.loading}
                    />
                </div>

                <StyledP>{this.state.text}</StyledP>
            </ContainerStyles>
        )
    }
}

export default Loading
