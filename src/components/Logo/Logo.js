import React from 'react';
import classes from './Logo.module.css'
import Tilt from 'react-tilt'
import  logo from '../../assets/brain.png';

const Logo = () => {
    return (
        <div className={classes.logo}>
            <Tilt className="Tilt" options={{ max : 55 }} style={{ height: 100, width: 100, border: '2px solid white', borderRadius: '5px', boxShadow: '0 3px 8px silver' }} >
            <img src={logo} alt='logo'/>

            </Tilt>
        </div>
    )
}

export default Logo
