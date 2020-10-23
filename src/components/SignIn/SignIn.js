import React from 'react'
import classes from './SignIn.module.css'


const SignIn = ({ submit, changeEmail, changePassword, onRouteChange }) => {
    return (
        <div>
            <form className={classes.form} onSubmit={submit}>
                <h1>SignIn</h1>
                <label for='email'>Email:</label>
                <input onChange={changeEmail} id='email' type='email' placeholder='email' required />
                <label for='password'>Password:</label>
                <input onChange={changePassword} id='password' type='password' placeholder='password' required />
                <input type='submit' onClick={() => onRouteChange('home')} value='Sign In' />
                <span onClick={() => onRouteChange('register')} >Register</span>
            </form>

        </div>
    )
}

export default SignIn
