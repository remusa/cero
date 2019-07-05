import styled, { keyframes } from 'styled-components'

const loading = keyframes`
    from {
        background-position: 0 0;
        /* rotate: 0; */
    }

    to {
        background-position: 100% 100%;
        /* rotate: 360deg; */
    }
`

const FormStyles = styled.div`
    form {
        /* background: linear-gradient(${props =>
            props.theme.colorPrimaryLighter} 52.08%, ${props => props.theme.colorPrimary} 100%); */
        /* background: linear-gradient(${props => props.theme.colorPrimaryLighter}, ${props =>
    props.theme.colorPrimaryDarker}); */

        /* background: linear-gradient(120deg, ${props =>
            props.theme.colorGreyLight} 52.08%, ${props => props.theme.colorGreyDark} 100%); */
        box-shadow: 0 0 8px ${props => props.theme.boxShadow};

        border-radius: 20px;
        padding: 20px;
        font-size: 1.5rem;
        line-height: 1.5;
        font-weight: 600;
        max-width: 300px;

        h2 {
            border-bottom: 3px solid ${props => props.theme.colorPrimary};
        }

        label {
            display: block;
            margin-bottom: 1rem;
        }

        input,
        textarea,
        select {
            width: 100%;
            padding: 0.5rem;
            font-size: 1rem;
            border: 1px solid black;
            border-radius: 3px;

            &:focus {
                outline: 0;
                border-color: ${props => props.theme.colorPrimary};
                box-shadow: 0 0 10px ${props => props.theme.colorPrimary};
            }
        }

        button {
            font-family: 'Montserrat', sans-serif;
            font-weight: bold;
        }

        button[type='submit'],
        input[type='submit'] {
            outline: none;
            width: auto;
            background: ${props => props.theme.colorPrimary};
            color: ${props => props.theme.colorWhite};
            border: 0;
            border-radius: 3px;
            font-size: 1.5rem;
            font-weight: 600;
            padding: 0.5rem 1.2rem;

            margin-right: 8px;
        }

        button.resetButton {
            outline: none;
            width: auto;
            background: ${props => props.theme.colorGrey};
            color: ${props => props.theme.colorWhite};
            border: 0;
            border-radius: 3px;
            font-size: 1.5rem;
            font-weight: 600;
            padding: 0.5rem 1.2rem;
        }

        fieldset {
            display: flex;
            flex-flow: column wrap;
            justify-content: space-between;

            height: 100%;
            border: 0;
            padding: 0;

            &[disabled] {
                opacity: 0.5;
            }

            .fields {}

            .buttons {
                &::after {
                    height: 10px;
                    content: '';
                    display: block;
                    border-radius: 3px;
                    background-image: linear-gradient(
                        to right,
                        ${props => props.theme.colorPrimaryLighter} 0,
                        ${props => props.theme.colorPrimary} 50%,
                        ${props => props.theme.colorPrimaryDarker} 100%
                    );
                }

                &[aria-busy='true']::after {
                    background-size: 50% auto;
                    animation: ${loading} 0.5s linear infinite;
                }
            }
        }

        .errorMessage {
            color: red;
            font-size: 1rem;
        }

        .divider {
            margin-top: 8px;
            width: 100%;
            height: 8px;
            border-radius: 30px;
            background-color: ${props => props.theme.colorPrimary};
        }
    }
`

export default FormStyles
