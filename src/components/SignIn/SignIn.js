import React, { Component } from 'react'
import classes from './SignIn.module.css'


class SignIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            signInEmail: '',
            signInPassword: '',
            message: ''
        }
    }

    onEmailChange = (event) => {
        this.setState({ signInEmail: event.target.value })
    }

    onPasswordChange = (event) => {
        this.setState({ signInPassword: event.target.value })
    }
    saveAuthTokenIdSession = (token) => {
        window.sessionStorage.setItem('token',token);
    }

    onSubmitSignIn = (event) => {
        event.preventDefault()
        fetch('http://localhost:3000/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        .then(response => response.json())
        .then(user => {
            if (user.userId && user.success === true) {
                this.saveAuthTokenIdSession(user.token)
                console.log(user)
                fetch(`http://localhost:3000/profile/${user.userId}`, {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': user.token
                    }
                    })
                    .then(res => res.json())
                    .then(user => {
                        if(user && user.email){
                            console.log(user)
                            this.props.loadUser(user)
                            this.props.onRouteChange('home')
                        }else {
                            console.log('user not loaded')
                        }
                    })
                    .catch(err => console.log(err))
            }else {
                console.log(user.message);
                this.setState({message: user.message})
            }
        })
    }
    render() {
        return (
            <div>
                <form className={classes.form} >
                    <h1>SignIn</h1>
                    {this.state.message ? <small style={{margin:'0 0 10px',color:'red'}}>{this.state.message}</small> : null}

                    <label htmlFor='email'>Email:</label>
                    <input
                        onChange={this.onEmailChange}
                        id='email'
                        type='email'
                        placeholder='email'
                        required
                    />
                    <label htmlFor='password'>Password:</label>
                    <input
                        onChange={this.onPasswordChange}
                        id='password'
                        type='password'
                        placeholder='password'
                        required
                    />
                    <input type='submit'
                        onClick={this.onSubmitSignIn}
                        value='Sign In'
                    />
                    <span onClick={() => this.props.onRouteChange('register')} >Register</span>
                </form>

            </div >
        )
    }
}

export default SignIn
