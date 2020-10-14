import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    NavBar,
    Toast,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Picker,
    Button
    } from 'antd-mobile'

import Logo from '../logo/logo'

export default class Register extends Component{

    state={
        username:'',
        password:'',
        rePassword:'',
        userType:''
    }

    static propTypes = {
        user: PropTypes.object.isRequired,
        toRegister: PropTypes.func.isRequired,
    }
    

    userType=[{
        label:'Recruiter',
        value:'recruiter'
      }, 
      {
        label:'Job seeker',
        value:'seeker'
    }]

    updateState = (type, val) =>{
        this.setState({[type]:val})
    }

    toRegister = () =>{
        // Format
        const {user} = this.props
        const userData = JSON.parse(JSON.stringify(this.state).replace('[','').replace(']',''))
        this.props.toRegister(userData)
        if(user.errMsg){
            Toast.fail(JSON.stringify(user.errMsg),1)
        }

    }

    render() {
        return (
            <div>
                <NavBar>Di-recruitment</NavBar>
                <Logo/>
                <WingBlank>
                    <List>
                        <InputItem placeholder="Please enter the username" onChange={val => this.updateState('username', val)}>Username:</InputItem>
                        <InputItem type='password' placeholder="Please enter the password" onChange={val => this.updateState('password', val)}>Password:</InputItem>
                        <InputItem type='password' labelNumber={10} placeholder="Please re-enter the password" onChange={val => this.updateState('rePassword', val)}>Re-password:</InputItem>
                        <Picker
                            data={this.userType}
                            cols={1}
                            extra='Please choose'
                            okText='OK'
                            dismissText='Cancel'
                            value={this.state.userType}
                            onOk={val => this.updateState('userType', val)}
                            >
                            <List.Item arrow="horizontal">Type:</List.Item>
                        </Picker>
                    </List>
                    <WhiteSpace></WhiteSpace>
                    <Button type="primary" onClick={this.toRegister}>Register</Button>
                    <WhiteSpace size="lg"></WhiteSpace>
                    <Button onClick={()=>this.props.history.replace('/login')}>Already have an account</Button>
                </WingBlank>
            </div>
        )
    }
}