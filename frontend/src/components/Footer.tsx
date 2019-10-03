import React, { useContext } from 'react'
import styled from 'styled-components'
import { ThemeContext } from '../data/ThemeContext'

const FooterStyles = styled.div`
    grid-area: footer;

    footer {
        background-color: ${props => props.theme.colorPrimary};
        text-align: center;
        line-height: 2;
        height: 40px;
        padding: 0 8px 0 8px;

        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        align-items: center;

        .emoticon {
            color: ${props => props.theme.colorRed};
        }

        a,
        p,
        span {
            color: #fff;
        }

        a:hover {
            text-decoration: underline;
        }

        .credits {
            /* margin-left: 40px; */
        }

        .toggleDarkMode {
            display: flex;
            flex-flow: row;
            justify-content: flex-end;

            .moon {
                color: white;

                &:hover,
                &.active {
                    background: rgba(40, 28, 77, 0.7);
                }
            }

            .sun {
                color: yellow;

                &:hover,
                &.active {
                    background: rgba(255, 255, 0, 0.7);
                }
            }

            button {
                margin-left: 4px;

                background: transparent;
                border: 1px solid transparent;

                outline: 0;
                padding: 4px 8px;
                border-radius: 3px;
            }
        }
    }

    @media all and (max-width: 800px) {
        footer {
            display: flex;
            justify-content: space-around;
        }
    }

    @media all and (max-width: 500px) {
        footer {
            height: auto;
            flex-flow: column wrap;
            justify-content: space-between;
            padding: 4px;

            &:last-child {
                /* padding-bottom: 8px; */
            }

            .credits {
                margin-left: 0;
            }

            button {
                margin: 0;
            }
        }
    }
`

const Footer: React.FC = () => {
    const { theme, setDarkMode } = useContext(ThemeContext)

    return (
        <FooterStyles>
            <footer>
                <span />

                <span className='credits'>
                    Built with <span className='emoticon'>❤</span>
                    {' by '}
                    <a href='https://renems.com' target='_blank' rel='noopener noreferrer'>
                        RMS
                    </a>
                </span>

                <span className='toggleDarkMode'>
                    <button
                        type='button'
                        className={theme === 'light' ? 'sun active' : 'sun'}
                        onClick={() => setDarkMode(true)}
                    >
                        {/* ☀ */} ☀️
                    </button>

                    <button
                        type='button'
                        className={theme === 'dark' ? 'moon active' : 'moon'}
                        onClick={() => setDarkMode(false)}
                    >
                        {/* ☾ */} 🌙
                    </button>
                </span>
            </footer>
        </FooterStyles>
    )
}

export default Footer
