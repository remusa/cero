import styled from 'styled-components'

export const TableStyles = styled.table`
    border-spacing: 0;
    border: 1px solid var(--color-grey);
    border-radius: 4px;
    margin: 0 auto;
    width: auto;

    thead {
        font-size: 1rem;
        padding: 4px;

        border-bottom: 4px solid var(--color-primary);
    }

    .divider {
        width: 100%;
        height: 3px;
        border-radius: 1px;
        background-color: var(--color-primary);
        pointer-events: none;
    }

    td,
    th {
        font-size: 1.2rem;
        padding: 4px;
        position: relative;

        label {
            padding: 8px 4px;
            display: block;
        }
    }

    tr {
        &:hover {
            background: var(--color-primary);
            box-shadow: 0 0 20px var(--color-primary-darker);
            border-radius: 20px;
        }
    }
`