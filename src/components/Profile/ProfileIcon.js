import React from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import * as classes  from './ProfileIcon.module.css';


class ProfileIcon extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            dropdownOpen: false,
        }
    }
    toggle = () => {

        this.setState((prevState) => ({dropdownOpen:!prevState.dropdownOpen}))
    }

    render(){
        return (
            <div className={classes.profile}>
                <Dropdown  isOpen={this.state.dropdownOpen} toggle={this.toggle} direction='botton'>
                    <DropdownToggle   className={classes.toggle}>
                        <img src='https://picsum.photos/200/300' className={classes.image}/>
                    </DropdownToggle>
                    <DropdownMenu right='false' className={classes.menu}>
                        <DropdownItem onClick={this.props.toggleModal}>View Profile</DropdownItem>
                        <DropdownItem onClick={() => this.props.clickRouteChange('signout')}>Signout</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
              
            </div>
        )
    }
}

export default ProfileIcon
