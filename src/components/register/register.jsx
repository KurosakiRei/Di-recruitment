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
import {Redirect} from 'react-router-dom'

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
        errMsg: PropTypes.func.isRequired,
    }
    
    userType=[{
        label:'Recruiter',
        value:'recruiter'
      }, 
      {
        label:'Job seeker',
        value:'seeker'
    }]

    // Display the error message
    componentDidUpdate(){
        const {user, errMsg} = this.props
        if(user.errMsg){
            Toast.fail(user.errMsg,1.5)
            errMsg('')
        }
    }

    updateState = (type, val) =>{
        this.setState({[type]:val})
    }

    toRegister = () =>{
        // Format
        const userData = JSON.parse(JSON.stringify(this.state).replace('[','').replace(']',''))
        this.props.toRegister(userData)
        
    }

    render() {
        const {user} = this.props
        if(user.redirect){
            return <Redirect to={user.redirect}/>
        }
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