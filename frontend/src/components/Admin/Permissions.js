import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Mutation, Query } from 'react-apollo'
import nprogress from 'nprogress'
import styled from 'styled-components'
import { UPDATE_PERMISSIONS_MUTATION } from '../../gql/UserMutation'
import { ALL_USERS_QUERY } from '../../gql/UserQuery'
import checkmarkIcon from '../../static/icons/checkmark.svg'
import Error from '../ErrorMessage'
import PermissionsButton from '../styled/PermissionsButton'
import PermissionsTable from '../styled/PermissionsTable'
import Loading from '../Loading'

import '../../static/nprogress.css'

const POSSIBLE_PERMISSIONS = ['ADMIN', 'USER', 'PERMISSIONUPDATE']

const LoadingStyles = styled.div`
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;
`

const Permissions = props => (
    <Query query={ALL_USERS_QUERY}>
        {({ data, loading, error }) => {
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
            variables={{ userId: user.id, permissions }}
        >
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
                                onClick={updatePermissions}
                            >
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
