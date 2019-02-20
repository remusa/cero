import React, { Component } from 'react';
import Particles from 'react-particles-js';
import './App.scss';
import Navigation from './components/navigation/Navigation';

const END_POINT='https://ceroapp.herokuapp.com'

const particlesOptions = {
  particles: {
      number: {
          value: 50,
          density: {
              enable: true,
              value_area: 800,
          },
      },
  },
}

const initialState = {
  route: 'signing',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    joined: new Date(),
  }
}

class App extends Component {
  constructor(props) {
    super(props)

    this.state = initialState

    this.loadUser = this.loadUser.bind(this)
    this.onRouteChange = this.onRouteChange.bind(this)
  }

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

  onRouteChange = route => {
    if (route === 'signout') {
        this.setState(initialState)
    } else if (route === 'home') {
        this.setState({
            isSignedIn: true,
        })
    }

    this.setState({
        route: route,
    })
}

  render() {
    const {isSignedIn} = this.state

    return (
      <div className="App">
        <Particles className='particles' params={particlesOptions} />

        <Navigation
            isSignedIn={isSignedIn}
            onRouteChange={this.onRouteChange}
        />



        <h1>
          Cero App
        </h1>
      </div>
    );
  }
}

export default App;
