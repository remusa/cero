import styled from 'styled-components'

export const TableStyles = styled.table`
    overflow-y: scroll;
    max-height: 250px;
    padding: 4px;
    box-shadow: 0 0 8px ${props => props.theme.boxShadow};

    @media all and (max-width: 500px) {
        margin-top: 8px;
        margin-bottom: 8px;
        padding-bottom: 8px;
    }

    border-spacing: 0;
    /* border: 1px solid ${props => props.theme.colorGrey}; */
    /* box-shadow: 0 5px 15px 0 hsla(0, 0, 0, 0.9); */
    /* box-shadow: 0 0 20px ${props => props.theme.colorPrimary}; */
    border-radius: 4px;
    margin: 0 auto;
    width: auto;
    /* max-height: 500px; */
    padding: 8px;

    thead {
        font-size: 1rem;
        padding: 4px;
        color: ${props => props.theme.colorHeader};

        border-bottom: 4px solid ${props => props.theme.colorPrimary};
    }

    .divider {
        width: 100%;
        height: 3px;
        border-radius: 1px;
        background-color: ${props => props.theme.colorPrimary};
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
            background: ${props => props.theme.colorPrimary};
            box-shadow: 0 0 20px ${props => props.theme.colorPrimaryDarker};
            border-radius: 20px;
        }
    }
`
