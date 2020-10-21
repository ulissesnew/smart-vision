import React from 'react'
import classes from './FaceRecognition.module.css'

const FaceRecognition = () => {
    return (
        <div className={classes.face}>
            <img src='https://images.unsplash.com/photo-1553531384-397c80973a0b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60' alt='output' />
        </div>
    )
}

export default FaceRecognition
