import React from 'react'
import classes from './FaceRecognition.module.css'

const FaceRecognition = ({ imageUrl, box }) => {
    return (
        <div className={classes.face}>
            <div style={{ position: "absolute", margin: "0 auto " }}  >
                <img width='500px' height='100%' id='imputimage' src={imageUrl} alt='' />
                <div style={{ top: box.topRow, bottom: box.bottomRow, left: box.leftCol, right: box.rightCol }} className={classes.bounding_boxes}></div>
            </div>
        </div>
    )
}

export default FaceRecognition
