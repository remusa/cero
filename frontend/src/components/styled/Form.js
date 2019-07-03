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
        /* background: linear-gradient(var(--color-primary-lighter) 52.08%, ${props => props.theme.colorPrimary} 100%); */
        /* background: linear-gradient(var(--color-primary-lighter, ${props => props.theme.colorPrimaryDarker}); */
        box-shadow: 0 0 20px var(--color-primary-darkest);
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

        button[type='submit'],
        input[type='submit'] {
            outline: none;
            width: auto;
            background: ${props => props.theme.colorPrimary};
            color: var(--color-white);
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
            background: var(--color-grey);
            color: var(--color-white);
            border: 0;
            border-radius: 3px;
            font-size: 1.5rem;
            font-weight: 600;
            padding: 0.5rem 1.2rem;
        }

        fieldset {
            border: 0;
            padding: 0;

            &[disabled] {
                opacity: 0.5;
            }
            &::before {
                height: 10px;
                content: '';
                display: block;
                background-image: linear-gradient(
                    to right,
                    var(--color-primary-lighter) 0,
                    ${props => props.theme.colorPrimary} 50%,
                    ${props => props.theme.colorPrimaryDarker} 100%
                );
            }
            &[aria-busy='true']::before {
                background-size: 50% auto;
                animation: ${loading} 0.5s linear infinite;
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
