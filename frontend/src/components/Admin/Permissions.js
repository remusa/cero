import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import nprogress from 'nprogress'
import { UPDATE_PERMISSIONS_MUTATION } from '../../gql/UserMutation'
import { ALL_USERS_QUERY } from '../../gql/UserQuery'
import checkmarkIcon from '../../static/icons/checkmark.svg'
import '../../static/nprogress.css'
import Error from '../ErrorMessage'
import Loading from '../Loading'
import PermissionsButton from '../styled/PermissionsButton'
import PermissionsTable from '../styled/PermissionsTable'

const POSSIBLE_PERMISSIONS = ['ADMIN', 'USER', 'PERMISSIONUPDATE']

const LoadingStyles = styled.div`
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;
`

const Permissions = () => {
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
                            <img src={checkmarkIcon} alt='checkmark-icon' />
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

const UserPermissions = props => {
    const { user } = props
    const [permissions, setPermissions] = useState(user.permissions)

    const handlePermissionChange = e => {
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
                                type='checkbox'
                                checked={permissions.includes(permission)}
                                value={permission}
                                onChange={handlePermissionChange}
                            />
                        </label>
                    </td>
                ))}
                <td>
                    <PermissionsButton type='button' disabled={loading} onClick={updatePermissions}>
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
