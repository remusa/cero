import React from 'react'
import styled from 'styled-components'

const FooterStyles = styled.div`
    grid-area: footer;

    footer {
        background-color: var(--color-primary);
        text-align: center;

        display: flex;
        flex-flow: row wrap;
        justify-content: center;
        align-items: center;

        a,
        p {
            color: #fff;
        }
    }

    @media all and (max-width: 800px) {
        footer {
            justify-content: space-around;
        }
    }

    @media all and (max-width: 500px) {
        footer {
            flex-direction: column;

            &:last-child {
                padding-bottom: 8px;
            }
        }
    }
`

const Footer = () => (
    <FooterStyles>
        <footer>
            <p>RMS 2019</p>

            <a href="https://github.com/remusa/cero" target="_blank" rel="noopener noreferrer">
                Github
            </a>
        </footer>
    </FooterStyles>
)

export default Footer
