import React from 'react';

const Navigation = ({onRouteChange, isSignedIn}) => {
    if(isSignedIn) {
        return (
            <nav>
            <p
                    onClick={() => onRouteChange('signin')}
                    className="">
                    Sign Out
                </p>
            </nav>
        )
    } else {
        return (
            <nav>
                <p
                    onClick={() => onRouteChange('signin')}
                    className="">
                    Sign In
                </p>
                <p
                    onClick={() => onRouteChange('register')}
                    className="">
                    Register
                </p>
            </nav>
        )
    }
}

export default Navigation
