import React from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation.js'
import Logo from './components/Logo/Logo.js'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'

const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: 'bc1631a3cd3842a4b0caf2739774cc51'
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
      submit: false
    }
  }
  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }
  onButtonSubmit = (event) => {
    event.preventDefault();
    // console.log(this.state.input);
    // this.setState({ submit: true })
    app.models.predict(Clarifai.GENERAL_MODEL,
      // 'https://samples.clarifai.com/metro-north.jpg'
      this.state.input
    ).then(
      function (response) {
        console.log(response);
      },
      function (err) {
        console.log(err);
      }
    )
  }
  render() {

    return (
      <div className="App">
        <Particles
          className='particles'
          params={particlesOptions}
        />
        <header className="App-header">
          <Navigation />
          <Logo />
          <Rank />

          <ImageLinkForm
            change={this.onInputChange}
            text={this.state.input}
            click={this.onButtonSubmit}
          />
          {this.state.input}

          <FaceRecognition />
        </header>
      </div>
    );
  }
}

export default App;
