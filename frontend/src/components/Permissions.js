import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Error from './ErrorMessage'
import PermissionsTable from './styled/PermissionsTable'
import PermissionsButton from './styled/PermissionsButton'
import checkmarkIcon from '../static/icons/checkmark.svg'

const POSSIBLE_PERMISSIONS = ['ADMIN', 'USER', 'PERMISSIONUPDATE']

const UPDATE_PERMISSIONS_MUTATION = gql`
    mutation updatePermissions($userId: ID!, $permissions: [Permission]) {
        updatePermissions(userId: $userId, permissions: $permissions) {
            id
            permissions
            name
            email
        }
    }
`

const ALL_USERS_QUERY = gql`
    query ALL_USERS_QUERY {
        users {
            id
            name
            email
            permissions
        }
    }
`

const Permissions = props => (
    <Query query={ALL_USERS_QUERY}>
        {({ data, loading, error }) => {
            if (error) return <Error error={error} />
            if (loading) return <p>Loading...</p>
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
                                    <img src={checkmarkIcon} alt='startStopIcon' />
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
        }}
    </Query>
)

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

    return (
        <Mutation
            mutation={UPDATE_PERMISSIONS_MUTATION}
            variables={{ userId: user.id, permissions }}>
            {(updatePermissions, { loading, error }) => (
                <>
                    {error && (
                        <tr>
                            <td colSpan='8'>
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
                            <PermissionsButton
                                type='button'
                                disabled={loading}
                                onClick={updatePermissions}>
                                Updat{loading ? 'ing' : 'e'}
                            </PermissionsButton>
                        </td>
                    </tr>
                </>
            )}
        </Mutation>
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
