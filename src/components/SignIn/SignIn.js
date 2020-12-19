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

    onSubmitSignIn = (event) => {
        event.preventDefault()
        fetch('https://smart-vision-app.herokuapp.com/signin', {
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
                    if (user[0]) {
                        this.props.loadUser(user[0])
                        this.props.onRouteChange('home')
                    }else 
                        console.log(user.message);
                        this.setState({message: user.message})
            })
            .catch(err => {
                console.log(err);
              
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
