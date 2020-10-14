import React, { Component } from 'react'
import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Button
    } from 'antd-mobile'

import Logo from '../logo/logo'

export default class Login extends Component{

    state={
        username:'',
        password:'',
    }

    updateState = (type, val) =>{
        this.setState({[type]:val})
    }

    toLogin = () =>{
        console.log(this.state)
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
                    </List>
                    <WhiteSpace size="lg"></WhiteSpace>
                    <WhiteSpace size="xl"></WhiteSpace>
                    <WhiteSpace size="xl"></WhiteSpace>
                    <WhiteSpace size="xl"></WhiteSpace>
                    <WhiteSpace size="xl"></WhiteSpace>
                    <Button type="primary" onClick={this.toLogin}>Login</Button>
                    <WhiteSpace size="lg"></WhiteSpace>
                    <Button onClick={()=>this.props.history.replace('/register')}>Create an account</Button>
                </WingBlank>
            </div>
        )
    }
}