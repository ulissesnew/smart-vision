
import React from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation.js'
import Logo from './components/Logo/Logo.js'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register'

// import {
//   Switch,
//   Route,
//   Link,

// } from "react-router-dom";

require('dotenv').config();

const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: process.env.REACT_APP_API_KEY
});

const particlesOptions =
{
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    },
    line_linked: {
      shadow: {
        enable: true,
        color: "#3CA9D1",
        blur: 5,
      },
      size: {
        value: 3
      }
    },

    interactivity: {
      events: {
        onhover: {
          enable: true,
          mode: "repulse"
        }
      }
    }
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: 'https://images.unsplash.com/photo-1601758260892-a62c486ace97?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
      submit: false,
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }
  onButtonSubmit = (event) => {
    event.preventDefault();
    app.models.predict(Clarifai.FACE_DETECT_MODEL,
      this.state.input)
      .then((response) => {
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(error => console.log(error)
      )
    this.setState({ imageUrl: this.state.input })

  }
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('imputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      rightCol: width - (clarifaiFace.right_col * width),
      topRow: clarifaiFace.top_row * height,
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }
  displayFaceBox = (box) => {
    console.log(box);
    this.setState({ box: box })
  }
  onRouteChange = (route) => {
    this.setState({ route: route })
    if (route === 'signout') {
      this.setState({ isSignedIn: false })
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    } else {

    }
  }
  render() {
    const { route, isSignedIn, input, imageUrl, box } = this.state
    return (
      <div className="App">
        <Particles
          className='particles'
          params={particlesOptions}
        />
        <header className="App-header">
          <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          {route === 'signin' ?
            <SignIn onRouteChange={this.onRouteChange} /> :
            route === 'register' ?
              <Register onRouteChange={this.onRouteChange} /> :
              <>
                <Logo />
                <Rank />
                <ImageLinkForm
                  change={this.onInputChange}
                  text={input}
                  click={this.onButtonSubmit}
                />
                {/* <Switch>
            <Route path='/register' component='' />
            <Route path='/signin' component={SignIn} />
            <Route path='/' component='' />
          </Switch> */}
                <FaceRecognition imageUrl={imageUrl} box={box} />
              </>}
        </header>
      </div>
    );
  }
}

export default App;
