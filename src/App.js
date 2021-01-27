
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navigation from './components/Navigation/Navigation.js'
import Logo from './components/Logo/Logo.js'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register'
import Modal from './components/Modal/Modal';
import Profile from './components/Profile/Profile'

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
const initialState = 
{
  input: '',
  imageUrl: 'https://images.unsplash.com/photo-1601758260892-a62c486ace97?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
  submit: false,
  boxes: [],
  route: 'signin',
  isSignedIn: true,
  user: {
    id: '',
    name: '',
    entries: 0,
    email: '',
    joined: '',
    age: '',
    pet: ''
  },
  isProfileOpen: false

}
class App extends React.Component {
  constructor() {
    super();
    this.state = initialState
  }
  loadUser = (data) => {
    this.setState(
      {
        user: {
          id: data.id,
          name: data.name,
          entries: data.entries,
          email: data.email,
          joined: data.joined
        }
      })
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }
  onButtonSubmit = (event) => {
    event.preventDefault();
    this.setState({imageUrl: this.state.input})
    fetch('http://localhost:3000/imageurl', 
    {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({input: this.state.input})
    })
    .then(response => response.json())

      .then(response => {
        if (response) {
          fetch('http://localhost:3000/image',
            {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: JSON.stringify({ id: this.state.user.id })
            }
          ).then(response => response.json())
            .then(count => {
              console.log(count);
              this.setState(Object.assign(this.state.user, {
                entries: count
              }))
            }).catch(err => {
              console.log(err)
            })
        }
        // console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
        this.displayFaceBox(this.calculateFaceLocation(response));

      })
      .catch(error => console.log(error)
      )
    this.setState({ imageUrl: this.state.input })

  }
  calculateFaceLocation = (data) => {
    const image = document.getElementById('imputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return data.outputs[0].data.regions.map(box => {
      const clarifaiFace = box.region_info.bounding_box;
      return {
        leftCol: clarifaiFace.left_col * width,
        rightCol: width - (clarifaiFace.right_col * width),
        topRow: clarifaiFace.top_row * height,
        bottomRow: height - (clarifaiFace.bottom_row * height)
      }
    })
   
  }
  displayFaceBox = (boxes) => {
    console.log(boxes);
    this.setState({ boxes: boxes })
  }
  onRouteChange = (route) => {
    if (route === 'signout') {
      return this.setState(initialState)
    } else if (route === 'home') {
      this.setState({ isSignedIn: true, route:'home' })
    } else if(route === 'register'){
        this.setState({isSignIn:true,route:'register'})
    } else if(route === 'signin'){
      this.setState({route:'signin'})
    }
  }
  toggleModal = () => {
    console.log(this.state.isProfileOpen)
    this.setState( prevState => {
      return {...prevState, isProfileOpen: !prevState.isProfileOpen}} )
  }
  onSaveProfile = () => {
    console.log('save profile')
    this.setState({route:'home', isProfileOpen:false})
    
  }
  render() {
    const { route, isSignedIn, input, imageUrl, boxes, isProfileOpen,user } = this.state
   
    return (
      <div className="App">
        <Particles
          className='particles'
          params={particlesOptions}
        />
        <header >
          <Navigation toggleModal={this.toggleModal} onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
            {isProfileOpen && <Modal >
                  <Profile toggleModal={this.toggleModal} 
                  isProfileOpen={isProfileOpen} 
                  saveProfile={this.onSaveProfile}
                   onRouteChange={this.onRouteChange}
                   userInfo={this.state.user}
                   />
            </Modal> }
          {route === 'signin' ?
            <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} /> :
            route === 'register' ?
              <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} /> :
              <>
                <Logo />
                
                <Rank entries={user.entries} name={user.name}/>
                <ImageLinkForm
                  change={this.onInputChange}
                  text={input}
                  click={this.onButtonSubmit}
                />
         
                <FaceRecognition imageUrl={imageUrl} boxes={boxes} /> 
              </> 
              }
              
                
             
        </header>
      </div>
    );
  }
}

export default App;
