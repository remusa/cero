import React, { Component } from 'react'
import { Switch, Route } from "react-router-dom";
import Home from './Home'
import Login from './Login'
import Register from './Register'

class Main extends Component {
    render () {
        return (
            <main>
                <h1>Cero</h1>

                <Switch>
                    <Route path='/' exact component={Home}/>
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                </Switch>
            </main>
        )
    }
}

export default Main
