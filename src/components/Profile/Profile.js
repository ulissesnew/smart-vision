import React, { Component } from 'react'
import * as classes from './Profile.module.css';

const  Profile = ({isProfileOpen,toggleModal, saveProfile, onRouteChange,userInfo}) =>  {

        return (
            <div className={classes.profile} 
                style={{display: isProfileOpen }} >
                    
                    <aside className={classes.content} >
                    {/* {this.state.success ? null : message} */}
                    <button className={classes.closeModal}
                        onClick={toggleModal}
                     >
                    &times;
                    </button>
                    <div className={classes.info}>
                        <img src='https://picsum.photos/200/300' alt='profile'/>

                        <h1>{userInfo.name}</h1>
                        <h4>Image Submitted: <span>{userInfo.entries}</span> </h4>
                        <p>Member since: <span>{new Date(userInfo.joined).toLocaleDateString()}</span></p>
                    </div>
                    <div className={classes.form}>
                        <label htmlFor='user-name'>Name:</label>
                        <input id='user-name' type='text' placeholder={userInfo.name} />

                        <label htmlFor='user-age'>Age:</label>
                        <input  id='user-age' type='text' placeholder={userInfo.age} />
                        <label htmlFor='user-pet'>Pet:</label>
                        <input id='user-pet' type='text' placeholder={userInfo.pet} />
                        <div className={classes.send}>
                            <span onClick={saveProfile} className={classes.submit}>Save</span>
                            <span className={classes.cancel} onClick={saveProfile} >Cancel</span>
                        </div>
                    </div>
                </aside>
                {/* <div className={classes.content}>
                    <img src='https://picsum.photos/200/300' alt='profile'/>
                    <h5>name:<span className={classes.info}> Joao</span></h5>
                    <h5>email: <span className={classes.info}>joao@gmail.com</span></h5>
                    <h5>password: <span className={classes.info}>joao1</span></h5>
                </div> */}
            </div>
        )
}

export default  Profile