import React, { Component } from 'react'
import * as classes from './Profile.module.css';

class Profile extends Component  {
    constructor(props){
        super(props);
        this.state = {
            name: this.props.user.name,
            age: this.props.user.age,
            pet: this.props.user.pet
        }
    }
    onFormChange = (event) => {
        switch(event.target.name){
            case 'user-name':
                this.setState({name: event.target.value})
                break;
            case 'user-age':
                this.setState({age: event.target.value})
                break;
            case 'user-pet':
                this.setState({pet: event.target.value})
                break;
            default :
                return 
        }
    }
    onProfileUpdate = (data) => {
        const token = window.sessionStorage.getItem('token');
        fetch(`http://localhost:3000/profile/${this.props.user.id}`,
        {
            method: 'post',
            headers: {'Content-Type': 'application/json',
            'Authorization':token},
            body: JSON.stringify({formInput:data})

        })
         .then(resp => {
             if(resp.status === 200 || resp.status === 304){
                 console.log(resp);
                this.props.toggleModal();
                this.props.loadUser({ ...this.props.user, ...data});
             }else {
                 console.log('somenthing went wrong');
             }

            
         })
         .catch(err => {
             console.log(err);
         })
        
    }
        render(){
            const {user} = this.props;

            const {name, age, pet} = this.state;
        return (
            <div className={classes.profile} 
                style={{display: this.props.isProfileOpen }} >
                    
                    <aside className={classes.content} >
                    {/* {this.state.success ? null : message} */}
                    <button className={classes.closeModal}
                        onClick={this.props.toggleModal}
                     >
                    &times;
                    </button>
                    <div className={classes.info}>
                        <img src='https://picsum.photos/200/300' alt='profile'/>

                        <h1>{name}</h1>
                        <h4>Image Submitted: <span>{user.entries}</span> </h4>
                        <p>Member since: <span>{new Date(user.joined).toLocaleDateString()}</span></p>
                    </div>
                    <div className={classes.form} >
                        <label htmlFor='user'>Name:</label>
                        <input onChange={this.onFormChange} id='user' name='user-name' type='text' placeholder={name} />

                        <label htmlFor='age'>Age:</label>
                        <input onChange={this.onFormChange} id='age' name='user-age' type='text' placeholder={age} />
                        <label htmlFor='pet'>Pet:</label>
                        <input onChange={this.onFormChange} id='pet' name='user-pet' type='text' placeholder={pet} />
                        <div className={classes.send}>
                            <span  onClick={() => this.onProfileUpdate({name,pet,age})} 
                            className={classes.submit}>Save</span>
                            <span onClick={this.props.closeModal} className={classes.cancel}  >Cancel</span>
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
}

export default  Profile