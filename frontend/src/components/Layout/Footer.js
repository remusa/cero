import React from 'react'
import styled from 'styled-components'

const FooterStyles = styled.div`
    grid-area: footer;

    footer {
        /* background-image: radial-gradient(circle, var(--color-primary), var(--color-primary-darker)); */
        background-color: var(--color-primary);
        text-align: center;
        /* line-height: 2; */
        height: 40px;

        display: flex;
        flex-flow: row wrap;
        justify-content: space-around;
        align-items: center;

        a,
        p {
            /* padding: 4px;
            margin: 4px; */
            color: #fff;
        }

        a:hover {
            /* font-weight: 600; */
            text-decoration: underline;
        }
    }

    @media all and (max-width: 800px) {
        footer {
            justify-content: space-around;
        }
    }

    @media all and (max-width: 500px) {
        footer {
            height: auto;
            flex-flow: column;
            justify-content: space-evenly;

            &:last-child {
                /* padding-bottom: 8px; */
            }
        }
    }
`

const Footer = () => (
    <FooterStyles>
        <footer>
            <a href='https://renems.com' target='_blank' rel='noopener noreferrer'>
                Built by RMS
            </a>
        </footer>
    </FooterStyles>
)

export default Footer
