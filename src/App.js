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
      imageUrl: 'https://images.unsplash.com/photo-1601758260892-a62c486ace97?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
      submit: false,
      box: {}
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


          <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box} />
        </header>
      </div>
    );
  }
}

export default App;
