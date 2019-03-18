import React, { Component } from 'react'
import './App.scss'
import Header from './components/Header'
import Footer from './components/Footer'
import Main from './components/Main'

// const END_POINT='https://ceroapp.herokuapp.com'
const END_POINT = 'http://localhost:3000'

const initialState = {
    isSignedIn: false,
    user: {
        id: '',
        name: '',
        email: '',
        joined: new Date(),
    },
}

class App extends Component {
    state = initialState

    loadUser = data => {
        this.setState({
            user: {
                id: data.id,
                name: data.name,
                email: data.email,
                joined: data.joined,
            },
        })
    }

    render() {
        const { isSignedIn } = this.state

        return (
            <div className="App">
                <Header />

                <Main />

                <Footer />
            </div>
        )
    }
}

export default App
