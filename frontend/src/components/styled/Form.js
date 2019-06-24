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

const Form = styled.form`
    /* background: linear-gradient(var(--color-primary-lighter) 52.08%, var(--color-primary) 100%); */
    /* background: linear-gradient(var(--color-primary-lighter, var(--color-primary-darker)); */
    box-shadow: 0 0 20px var(--color-primary-darker);
    border-radius: 20px;
    padding: 20px;
    font-size: 1.5rem;
    line-height: 1.5;
    font-weight: 600;

    h2 {
        border-bottom: 3px solid var(--color-primary);
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
            border-color: var(--color-primary);
            box-shadow: 0 0 10px var(--color-primary);
        }
    }

    button[type='submit'],
    input[type='submit'] {
        outline: none;
        width: auto;
        background: var(--color-primary);
        color: var(--color-white);
        border: 0;
        border-radius: 5px;
        font-size: 1.7rem;
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
                var(--color-primary) 50%,
                var(--color-primary-darker) 100%
            );
        }
        &[aria-busy='true']::before {
            background-size: 50% auto;
            animation: ${loading} 0.5s linear infinite;
        }
    }

    .divider {
        margin-top: 8px;
        width: 100%;
        height: 8px;
        border-radius: 30px;
        background-color: var(--color-primary);
    }
`

export default Form
