import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const FooterStyles = styled.div`
    footer {
        background-color: var(--color-primary);
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        max-height: 40px;
        text-align: center;
        display: flex;
        flex-flow: column wrap;
        justify-content: center;
        align-items: center;

        a,
        p {
            color: #fff;
        }

        a {
            padding: 4px;
            margin: 4px;
            flex: 0 1 20px;
        }
    }

    @media all and (max-width: 800px) {
        footer {
            /* justify-content: space-around; */
            /* display: none; */
        }
    }

    @media all and (max-width: 500px) {
        footer {
            flex-direction: column;
            /* display: none; */
            position: absolute;
            bottom: 0;
        }

        a {
            /* margin-top: 8px; */
        }
    }
`

const Footer = () => (
    <FooterStyles>
        <footer>
            <p>RMS 2019</p>

            <a href='https://github.com/remusa/cero' target='_blank' rel='noopener noreferrer'>
                Github
            </a>
        </footer>
    </FooterStyles>
)

export default Footer
