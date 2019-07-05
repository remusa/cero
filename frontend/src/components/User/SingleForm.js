import React, { useState } from 'react'
import Main from '../Layout/Main'
import Login from './Login'
import Register from './Register'

import './SingleForm.scss'
import ParticlesStyles from '../Layout/Particles'

const SingleForm = props => {
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
            <div className='SingleFormStyles'>
                <button className='button-toggle' type='button' onClick={changePage}>
                    {page === 'login' ? 'Register' : 'Login'}
                </button>

                <div className='single-form-container'>
                    {page === 'login' && (
                        <>
                            <Login className='form' {...props} />

                            <div
                                role='button'
                                tabIndex={0}
                                className='mask'
                                onClick={changePage}
                                onKeyPress={changePage}
                            >
                                Create an account
                            </div>
                        </>
                    )}

                    {page === 'register' && (
                        <>
                            <div
                                role='button'
                                tabIndex={0}
                                className='mask'
                                onClick={changePage}
                                onKeyPress={changePage}
                            >
                                Login to your account
                            </div>

                            <Register className='form' {...props} />
                        </>
                    )}
                </div>
            </div>
        </Main>
    )
}

export default SingleForm
