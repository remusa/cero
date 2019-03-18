import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const FooterStyles = styled.div`
    footer {
        position: absolute;
        bottom: 0;
        left: 0;
        background-color: #fff;
        width: 100%;
        text-align: center;
        display: flex;
        flex-flow: row wrap;
        justify-content: space-evenly;
    }

    a {
        padding: 8px;
        margin: 8px;
        flex: 0 1 20px;
    }

    @media all and (max-width: 800px) {
        footer {
            /* justify-content: space-around; */
        }
    }

    @media all and (max-width: 500px) {
        footer {
            flex-direction: column;
        }

        a {
            margin-top: 8px;
        }
    }
`

const Footer = () => {
    return (
        <FooterStyles>
            <footer>
                <Link to="/">Home</Link>

                <Link to="/login">Login</Link>

                <Link to="/register">Register</Link>

                <Link to="/logout">Logout</Link>
            </footer>
        </FooterStyles>
    )
}

export default Footer
