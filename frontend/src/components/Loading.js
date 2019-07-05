import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { DotLoader } from 'react-spinners'

// const override = css`
//     display: block;
//     margin: 0 auto;
//     border-color: ${props => props.theme.colorPrimary};
// `

const override = {
    display: 'block',
    margin: '0 auto',
    borderColor: 'hsl(146, 100%, 39%)',
}

const ContainerStyles = styled.div`
    /* height: 100%; */
    /* width: 100%; */
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;
`

const StyledP = styled.p`
    text-align: center;
    font-size: 18px;
    font-weight: 600;
    color: ${props => props.theme.colorPrimary};
`

const ProgresBarStyles = styled.div`
    .progress-bar {
        height: 25px;
        background-color: #fefefe;
        border-radius: 3px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        margin: 15px;
        width: 500px;
        max-width: 100%;

        @media all and (max-width: 500px) {
            width: 300px;
        }
    }

    .progress {
        height: 25px;
        background: ${props => props.theme.colorGreen};
        background: -webkit-linear-gradient(
            to bottom,
            ${props => props.theme.colorGreenLighter},
            ${props => props.theme.colorGreen}
        );
        background: linear-gradient(
            to bottom,
            ${props => props.theme.colorGreenLight},
            ${props => props.theme.colorGreen}
        );
        border-radius: 3px;
        width: 0;
        transition: width 0.5s ease-in;
    }
`

const ProgressBar = ({ width }) => (
    <ProgresBarStyles>
        <div className='progress-bar'>
            <div data-size={width} className='progress' />
        </div>
    </ProgresBarStyles>
)

ProgressBar.propTypes = {
    width: PropTypes.number.isRequired,
}

const Loading = props => {
    const [text, setText] = useState(props.text || 'Loading')
    const [speed, setSpeed] = useState(props.speed || 300)
    const [loading, setLoading] = useState(true)
    const [width, setWidth] = useState(0)

    /* eslint-disable */
    useEffect(() => {
        const stopper = `${props.text}...`

        const interval = window.setInterval(() => {
            if (text === stopper) {
                setText(props.text)
            } else {
                setText(text.concat('.'))
                setWidth(width + 60)
            }
        }, speed)

        return () => {
            if (interval) {
                window.clearInterval(interval)
            }
        }
    }, [])
    /* eslint-enable */

    const progressBars = document.querySelectorAll('.progress')

    progressBars.forEach(bar => {
        const { size } = bar.dataset
        bar.style.width = `${size}%`
    })

    return (
        <ContainerStyles>
            <div className='sweet-loading'>
                <DotLoader
                    css={override}
                    sizeUnit='px'
                    size={100}
                    height={8}
                    color='hsl(146, 100%, 39%)'
                    loading={loading}
                />
            </div>

            <StyledP>{text}</StyledP>

            <ProgressBar width={100} />
        </ContainerStyles>
    )
}

Loading.propTypes = {
    text: PropTypes.string,
    speed: PropTypes.number,
}

export default Loading
