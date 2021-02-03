import React from 'react'
import classes from './ImageLinkForm.module.css'

const ImageLinkForm = ({ text, change, click,token }) => {
    return (
        <form className={classes.form}>
            <p className=''>This Magic Brain will detect faces in your pictures. </p>
            <span>Git it a try.</span>
            <div className={classes.inputs}>
                <input
                    onChange={change}
                    type='url'
                    placeholder='url of the image'
                    value={text}
                />
                <button onClick={click}>Detect</button>
            </div>
        </form>
    )
}

export default ImageLinkForm
