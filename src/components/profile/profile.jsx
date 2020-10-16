import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { 
    Result,
    List,
    WhiteSpace,
    Button,
    Modal
 } from 'antd-mobile'
import Cookies from 'js-cookie'


export default class Profile extends Component{

    static propTypes = {
        user: PropTypes.object.isRequired,
        resetUser: PropTypes.func.isRequired,
    }
    

    signOut = () => {
        Modal.alert('Sign out', 'Are you sure', [
          { text: 'Cancel', onPress: () => null },
          { text: 'OK', onPress: () => {
              this.props.resetUser()
                Cookies.remove('userid')
            } },
        ])
    }

    render() {
        const {username, avatar, company, position, info, salary}=this.props.user
        const Item = List.Item;
        const Brief = Item.Brief;
        return (
            <div>
                <Result
                title={username}
                img={<img src={require(`../../assets/images/avatars/${avatar}.png`)}  alt='avatar'/>}
                message={company}
                />
                <List renderHeader={()=>'Information'}>
                    <Item>
                        <Brief>Position: {position}</Brief>
                        <Brief>Info: {info}</Brief>
                        {salary?<Brief>Salary: {salary}</Brief>:null}
                    </Item>
                </List>
                <WhiteSpace></WhiteSpace>
                <Button type='warning' onClick={this.signOut}>Sign out</Button>
            </div>
        )
    }  
}