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
        /* height: 40px; */
        text-align: center;
        display: flex;
        flex-flow: row wrap;
        justify-content: space-evenly;
    }

    a {
        padding: 4px;
        margin: 4px;
        flex: 0 1 20px;
        color: #fff;
    }

    @media all and (max-width: 800px) {
        footer {
            /* justify-content: space-around; */
            display: none;
        }
    }

    @media all and (max-width: 500px) {
        footer {
            flex-direction: column;
        }

        a {
            /* margin-top: 8px; */
        }
    }
`

const Footer = () => (
    <FooterStyles>
        <footer>
            <Link to='/'>Home</Link>

            <Link to='/login'>Login</Link>

            <Link to='/register'>Register</Link>

            <Link to='/logout'>Logout</Link>
        </footer>
    </FooterStyles>
)

export default Footer
