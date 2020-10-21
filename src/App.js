import React from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation.js'
import Logo from './components/Logo/Logo.js'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import Particles from 'react-particles-js';

function App() {
  const particlesOptions =
  {
    particles: {
      number: {
        value: 50,
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
      
        
  return (
    <div className="App">
      <Particles 
          className='particles'
          params={particlesOptions}
        />
      <header className="App-header">
        <Navigation/>
       <Logo/>
        <Rank/>
       
       <ImageLinkForm/>
        {/*

       <faceRecognition/> */}
      </header>
    </div>
  );
}

export default App;
