import React, { Component } from 'react'
import classes from './SignIn.module.css'


class SignIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            signInEmail: '',
            signInPassword: ''
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
                // console.log(user);

                if (user !== 'User Not found') {
                    this.props.loadUser(user)
                    this.props.onRouteChange('home')
                }

            })


    }

    render() {
        // const { submit, changeEmail, changePassword, onRouteChange } = this.props

        return (
            <div>
                <form className={classes.form} >
                    <h1>SignIn</h1>
                    <label htmlFor='email'>Email:</label>
                    <input
                        onChange={this.onEmailChange}
                        id='email'
                        type='email'
                        placeholder='email'
                        // value={this.state.signInEmail}
                        required
                    />
                    <label htmlFor='password'>Password:</label>
                    <input
                        onChange={this.onPasswordChange}
                        id='password'
                        type='password'
                        placeholder='password'
                        // value={this.state.signInPassword}
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
