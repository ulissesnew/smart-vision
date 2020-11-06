import React from 'react'
import classes from './Register.module.css'


class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: ''
        }

    }
    onNameChange = (event) => {
        this.setState({ name: event.target.value })
    }
    onEmailChange = (event) => {
        this.setState({ email: event.target.value })
    }
    onPasswordChange = (event) => {
        this.setState({ password: event.target.value })
    }
    onSubmitSignIn = (event) => {
        event.preventDefault()
        fetch('http://localhost:3000/register',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: this.state.name,
                    email: this.state.email,
                    password: this.state.password
                })
            })
            .then(response => response.json())
            .then(user => {
                if (user) {
                    this.props.loadUser(user)
                    this.props.onRouteChange('home')
                }
            })
            .catch(err => console.log(err)
            )

    }

    // = ({ submit, changeEmail, changeName, changePassword, onRouteChange }) =>
    render() {
        return (
            <div>
                <aside className={classes.form} >
                    <h1>Register</h1>
                    <label htmlFor='name'>Name:</label>
                    <input onChange={this.onNameChange} id='name' type='text' placeholder='name' required />

                    <label htmlFor='email'>Email:</label>
                    <input onChange={this.onEmailChange} id='email' type='email' placeholder='email' required />
                    <label htmlFor='password'>Password:</label>
                    <input onChange={this.onPasswordChange} id='password' type='password' placeholder='password' required />
                    <input type='submit' onClick={this.onSubmitSignIn} value='Register' />
                    <span onClick={() => this.props.onRouteChange('signin')} >Sign In</span>

                </aside>

            </div>
        )
    }
}

export default Register
