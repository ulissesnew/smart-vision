import React from 'react'
import classes from './Navigation.module.css';
import ProfileIcon from '../Profile/ProfileIcon';

// import SignIn from '../SignIn/SignIn';

const Navigation = ({ onRouteChange, isSignedIn,toggleModal }) => {

    if (isSignedIn) {
        return (
            <div className={classes.nav}>
                <nav className={classes.navigation} >
                    <ProfileIcon isOpen='' clickRouteChange={onRouteChange} toggleModal={toggleModal}/>
                </nav>
            </div>
        )
    } else {
        return (
            <div className={classes.nav}>
                <nav className={classes.navigation} >
                    <p onClick={() => onRouteChange("signin")} > Sign In</p>
                </nav>
                <nav className={classes.navigation} >
                    <p onClick={() => onRouteChange("register")} > Register</p>
                </nav>
            </div>
        )
    }

}

export default Navigation
