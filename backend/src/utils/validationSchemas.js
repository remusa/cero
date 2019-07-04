import * as yup from 'yup'

export const usernameValidation = yup
    .string()
    .min(3, 'Username must be at least 3 characters long')
    .max(25, 'Username must be max. 25 characters')
    .required('Username is required')

export const emailValidation = yup
    .string()
    .email('Invalid email')
    .required('Email is required')

export const passwordValidation = yup
    .string()
    .min(10, 'Password must be at least 10 characters long')
    .max(25, 'Password must be max. 25 characters')
    .required('Password is required')

export const confirmPasswordValidation = yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required')
