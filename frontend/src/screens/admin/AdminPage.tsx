import { useQuery } from '@apollo/react-hooks'
import React, { useState } from 'react'
import styled from 'styled-components'
import Error from '../../components/ErrorMessage'
import { TableStyles } from '../../components/styled/Table'
import User from '../../components/User'
import { ALL_USERS_QUERY } from '../../gql/UserQuery'
import Permissions from '../permissions/Permissions'

const AdminStyles = styled.div`
    grid-area: main;

    display: flex;
    flex-flow: column wrap;
    justify-content: center;
`

const PageStyles = styled.div`
    /* min-height: 80%; */
    padding: 36px;
    /* border: 1px solid ${props => props.theme.colorPrimary}; */
    box-shadow: 0 0 8px ${props => props.theme.boxShadow};
    border-radius: 20px;

    display: grid;
    grid-template-columns: minmax(200px, 1fr) 3fr;
    grid-column-gap: 25px;
    grid-template-rows: auto(1fr);
    grid-template-areas: 'sidebar content';

    @media all and (max-width: 500px) {
        grid-template-areas: 'sidebar' 'content';
    }
`

const SidebarStyles = styled.div`
    grid-area: 'sidebar';

    display: flex;
    flex-flow: column wrap;
    justify-content: flex-start;
    align-items: center;

    .active {
        color: red;
        font-weight: 600;
    }

    p,
    li {
        font-size: 1.5rem;
        margin: 8px;
        list-style: none;
        cursor: pointer;

        &:hover {
            color: red;
            text-decoration: underline;
            font-weight: 600;
        }
    }
`

const ContentStyles = styled.div`
    grid-area: 'content';

    display: flex;
    flex-flow: column wrap;
    justify-content: flex-start;
    align-items: flex-start;
`

const NotAdmin = styled.div`
    grid-area: main;

    h2 {
        color: red;
    }
`

const Users: React.FC = () => {
    const { data, error, loading } = useQuery(ALL_USERS_QUERY)

    if (loading) return <div>Loading...</div>
    if (error) return <Error error={error} />

    return (
        <TableStyles>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                </tr>

                <tr>
                    <td colSpan={3} className="divider" >
                    </td>
                </tr>
            </thead>

            <tbody>
                {data.users.map(user => {
                    if (!user) return

                    const { id, email, name } = user

                    return (
                        <tr key={id}>
                            <td>{id}</td>
                            <td>{name}</td>
                            <td>{email}</td>
                        </tr>
                    )
                })}
            </tbody>
        </TableStyles>
    )
}

const AdminPage: React.FC = () => {
    const [page, setPage] = useState<string>(localStorage.getItem('admin-page') || 'permissions')

    const handlePage = (pg: string) => {
        setPage(pg)
        localStorage.setItem('admin-page', pg)
    }

    return (
        <User>
            {({ data }) => {
                const me = data ? data.me : null

                if (!me || !me.permissions.includes('ADMIN')) {
                    return <NotAdmin>{/* <h1>Not Admin</h1> */}</NotAdmin>
                }

                return (
                    <AdminStyles>
                        <h1>Admin</h1>

                        {/* <Link to='/permissions'>Permissions</Link> */}

                        <PageStyles>
                            <SidebarStyles>
                                <p
                                    className={page === 'permissions' ? 'active' : ''}
                                    onClick={e => handlePage('permissions')}
                                >
                                    Permissions
                                </p>
                                <p
                                    className={page === 'users' ? 'active' : ''}
                                    onClick={e => handlePage('users')}
                                >
                                    Users
                                </p>
                            </SidebarStyles>

                            <ContentStyles>
                                {page === 'permissions' && <Permissions />}
                                {page === 'users' && <Users />}
                            </ContentStyles>
                        </PageStyles>
                    </AdminStyles>
                )
            }}
        </User>
    )
}

export default AdminPage
