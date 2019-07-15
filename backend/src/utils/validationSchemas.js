const yup = require('yup')

const usernameValidation = yup
    .string()
    .min(3, 'Username must be at least 3 characters long')
    .max(25, 'Username must be max. 25 characters')
    .required('Username is required')

const emailValidation = yup
    .string()
    .email('Invalid email')
    .required('Email is required')

const passwordValidation = yup
    .string()
    .min(10, 'Password must be at least 10 characters long')
    .max(25, 'Password must be max. 25 characters')
    .required('Password is required')
    // .matches(
    //     /^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{10,}$/,
    //     'Must Contain 10 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
    // )

const confirmPasswordValidation = yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required')

module.exports = {
    usernameValidation,
    emailValidation,
    passwordValidation,
    confirmPasswordValidation,
}
