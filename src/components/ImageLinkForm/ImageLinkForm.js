import React from 'react'
import classes from './ImageLinkForm.module.css'

const ImageLinkForm = () => {
    return (
        <form className={classes.form}>
            <p className=''>This Magic Brain will detect faces in your pictures. </p>
            <span>Git it a try.</span>
            <div className={classes.inputs}>
                <input type='text' placeholder='url of the image'/>
                <button>Detect</button>
            </div>
        </form>
    )
}

export default ImageLinkForm
