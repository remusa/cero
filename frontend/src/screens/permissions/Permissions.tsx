import { useMutation, useQuery } from '@apollo/react-hooks'
import nprogress from 'nprogress'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import styled from 'styled-components'
import Error from '../../components/ErrorMessage'
import Loading from '../../components/Loading'
import PermissionsButton from '../../components/styled/PermissionsButton'
import PermissionsTable from '../../components/styled/PermissionsTable'
import { UPDATE_PERMISSIONS_MUTATION } from '../../gql/UserMutation'
import { ALL_USERS_QUERY } from '../../gql/UserQuery'
import checkmarkIcon from '../../static/icons/checkmark.svg'
import '../../static/nprogress.css'

const POSSIBLE_PERMISSIONS: string[] = ['ADMIN', 'USER', 'PERMISSIONUPDATE']

const LoadingStyles = styled.div`
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;
`

const Permissions: React.FC = () => {
    const { data, error, loading } = useQuery(ALL_USERS_QUERY)

    if (loading) {
        nprogress.start()
        return (
            <LoadingStyles>
                <Loading />
            </LoadingStyles>
        )
    }
    if (error) {
        nprogress.done()
        return <Error error={error} />
    }

    nprogress.done()

    return (
        <>
            <h2>Manage Permissions</h2>

            <PermissionsTable>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        {POSSIBLE_PERMISSIONS.map(permission => (
                            <th key={permission}>{permission}</th>
                        ))}
                        <th>
                            <img src={checkmarkIcon} alt="checkmark-icon" />
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {data.users.map(user => (
                        <UserPermissions user={user} key={user.id} />
                    ))}
                </tbody>
            </PermissionsTable>
        </>
    )
}

interface Props {
    user: {
        id: string
        name: string
        email: string
        permissions: string[]
    }
}

const UserPermissions = ({ user }: Props) => {
    const [permissions, setPermissions] = useState<string[]>(user.permissions)

    const handlePermissionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checkbox = e.target
        let updatedPermissions = [...permissions]
        if (checkbox.checked) {
            updatedPermissions.push(checkbox.value)
        } else {
            updatedPermissions = updatedPermissions.filter(
                permission => permission !== checkbox.value
            )
        }
        setPermissions(updatedPermissions)
    }

    const [updatePermissions, { error, loading }] = useMutation(UPDATE_PERMISSIONS_MUTATION, {
        variables: { userId: user.id, permissions },
    })

    return (
        <>
            {error && (
                <tr>
                    <td colSpan={8}>
                        <Error error={error} />
                    </td>
                </tr>
            )}
            <tr>
                <td>{user.name}</td>
                <td>{user.email}</td>
                {POSSIBLE_PERMISSIONS.map(permission => (
                    <td key={permission}>
                        <label htmlFor={`${user.id}-permission-${permission}`}>
                            <input
                                id={`${user.id}-permission-${permission}`}
                                type="checkbox"
                                checked={permissions.includes(permission)}
                                value={permission}
                                onChange={handlePermissionChange}
                            />
                        </label>
                    </td>
                ))}
                <td>
                    <PermissionsButton type="button" disabled={loading} onClick={updatePermissions}>
                        Updat{loading ? 'ing' : 'e'}
                    </PermissionsButton>
                </td>
            </tr>
        </>
    )
}

UserPermissions.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        email: PropTypes.string,
        permissions: PropTypes.array,
    }).isRequired,
}

export default Permissions
