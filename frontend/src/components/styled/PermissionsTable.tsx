import styled from 'styled-components'

const Table = styled.table`
    border-spacing: 0;
    width: 100%;
    /* border: 1px solid ${props => props.theme.colorPrimary}; */

    /* box-shadow: 0 0 20px ${props => props.theme.colorPrimaryDarker}; */
    box-shadow: 0 0 8px ${props => props.theme.boxShadow};

    border-radius: 4px;

    thead {
        font-size: 10px;
    }

    td,
    th {
        /* border-bottom: 1px solid var(--color-black);
    border-right: 1px solid var(--color-black); */
        padding: 5px;
        position: relative;

        &:last-child {
            border-right: none;
            width: 150px;

            button {
                width: 100%;
            }
        }

        label {
            padding: 10px 5px;
            display: block;
        }
    }

    tr {
        &:hover {
            background: ${props => props.theme.colorPrimary};
            box-shadow: 0 0 20px ${props => props.theme.colorPrimaryDarker};
            border-radius: 20px;
        }
    }
`

export default Table
