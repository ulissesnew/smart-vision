import React from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation.js'
import Logo from './components/Logo/Logo.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navigation/>
       <Logo/>
        {/*

       <ImageLinkForm/>
       <faceRecognition/> */}
      </header>
    </div>
  );
}

export default App;
