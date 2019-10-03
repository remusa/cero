import PropTypes from 'prop-types'
import React, { useState } from 'react'
import Login from '../screens/auth/Login'
import Register from './../screens/auth/Register'
import Main from './Main'
import './SingleForm.scss'

interface IMask {
    changePage: any
    text: string
}

function Mask({ changePage, text }: IMask) {
    return (
        <div
            role="button"
            tabIndex={0}
            className="mask"
            onClick={changePage}
            onKeyPress={changePage}
        >
            {text}
        </div>
    )
}

Mask.propTypes = {
    changePage: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
}

interface ISingleForm {
    props: any
}

const SingleForm = ({ props }: ISingleForm) => {
    const [page, setPage] = useState('login')

    const changePage = () => {
        if (page === 'login') {
            setPage('register')
        } else {
            setPage('login')
        }
    }

    return (
        <Main>
            {/* <ParticlesStyles /> */}
            <div className="SingleFormStyles">
                <button className="button-toggle" type="button" onClick={changePage}>
                    {page === 'login' ? 'Register' : 'Login'}
                </button>

                <div className="single-form-container">
                    {page === 'login' && (
                        <>
                            <Login className="form" {...props} />
                            
                            <Mask changePage={changePage} text="Create an account" />
                        </>
                    )}

                    {page === 'register' && (
                        <>
                            <Mask changePage={changePage} text="Login to your account" />

                            <Register className="form" {...props} />
                        </>
                    )}
                </div>
            </div>
        </Main>
    )
}

export default SingleForm
