import gql from 'graphql-tag'

const SIGNIN_MUTATION = gql`
    mutation SIGNIN_MUTATION($email: String!, $password: String!) {
        signin(email: $email, password: $password) {
            id
            email
            name
        }
    }
`

const SIGNUP_MUTATION = gql`
    mutation SIGNUP_MUTATION($email: String!, $name: String!, $password: String!) {
        signup(email: $email, name: $name, password: $password) {
            id
            email
            name
        }
    }
`

const SIGNOUT_MUTATION = gql`
    mutation SIGNOUT_MUTATION {
        signout {
            message
        }
    }
`

const RESET_MUTATION = gql`
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

const REQUEST_RESET_MUTATION = gql`
    mutation REQUEST_RESET_MUTATION($email: String!) {
        requestReset(email: $email) {
            message
        }
    }
`

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

const UPDATE_USER_MUTATION = gql`
    mutation updateUser($goal: Int) {
        updateUser(goal: $goal) {
            id
            email
            name
            goal
        }
    }
`

// const SUBSCRIPTION_MUTATION = gql`
//     mutation subscribeUser {
//         subscribeUser {
//             id
//             email
//             name
//             subscription
//         }
//     }
// `

export {
    SIGNIN_MUTATION,
    SIGNUP_MUTATION,
    SIGNOUT_MUTATION,
    RESET_MUTATION,
    REQUEST_RESET_MUTATION,
    UPDATE_PERMISSIONS_MUTATION,
    UPDATE_USER_MUTATION,
    // SUBSCRIPTION_MUTATION,
}
