import React from 'react'
import classes from './Register.module.css'


const Register = ({ submit, changeEmail, changeName, changePassword, onRouteChange }) => {
    return (
        <div>
            <form className={classes.form} onSubmit={submit}>
                <h1>Register</h1>
                <label htmlFor='name'>Name:</label>
                <input onChange={changeName} id='name' type='text' placeholder='name' required />

                <label htmlFor='email'>Email:</label>
                <input onChange={changeEmail} id='email' type='email' placeholder='email' required />
                <label htmlFor='password'>Password:</label>
                <input onChange={changePassword} id='password' type='password' placeholder='password' required />
                <input type='submit' onClick={() => onRouteChange('home')} value='Register' />
                <span onClick={() => onRouteChange('signin')} >Sign In</span>

            </form>

        </div>
    )
}

export default Register
