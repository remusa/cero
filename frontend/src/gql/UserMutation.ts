import gql from 'graphql-tag'

export const SIGNIN_MUTATION = gql`
    mutation SIGNIN_MUTATION($email: String!, $password: String!) {
        signin(email: $email, password: $password) {
            id
            email
            name
        }
    }
`

export const SIGNUP_MUTATION = gql`
    mutation SIGNUP_MUTATION($email: String!, $name: String!, $password: String!) {
        signup(email: $email, name: $name, password: $password) {
            id
            email
            name
        }
    }
`

export const SIGNOUT_MUTATION = gql`
    mutation SIGNOUT_MUTATION {
        signout {
            message
        }
    }
`

export const RESET_MUTATION = gql`
    mutation RESET_MUTATION($resetToken: String!, $password: String!, $confirmPassword: String!) {
        resetPassword(
            resetToken: $resetToken
            password: $password
            confirmPassword: $confirmPassword
        ) {
            id
            email
            name
        }
    }
`

export const REQUEST_RESET_MUTATION = gql`
    mutation REQUEST_RESET_MUTATION($email: String!) {
        requestReset(email: $email) {
            message
        }
    }
`

export const UPDATE_PERMISSIONS_MUTATION = gql`
    mutation updatePermissions($userId: ID!, $permissions: [Permission]) {
        updatePermissions(userId: $userId, permissions: $permissions) {
            id
            permissions
            name
            email
        }
    }
`

export const UPDATE_USER_MUTATION = gql`
    mutation updateUser($goal: Int) {
        updateUser(goal: $goal) {
            id
            email
            name
            goal
        }
    }
`

export const SUBSCRIPTION_MUTATION = gql`
    mutation subscribeUser {
        subscribeUser {
            id
            email
            name
            subscription
        }
    }
`
