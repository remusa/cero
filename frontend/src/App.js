import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import './App.scss'
import Header from './components/Header'
import Footer from './components/Footer'
import Fast from './components/Fast'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'

// const END_POINT='https://ceroapp.herokuapp.com'
const END_POINT = 'http://localhost:3000'

const initialState = {
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
        return (
            <div className="App">
                <Header />

                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/fast" component={Fast} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                </Switch>

                <Footer />
            </div>
        )
    }
}

export default App
