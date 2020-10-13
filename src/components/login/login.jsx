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
    render() {
        return (
            <div>
                <NavBar>Di-recruitment</NavBar>
                <Logo/>
                <WingBlank>
                    <List>
                        <InputItem placeholder="Please enter the username" >Username:</InputItem>
                        <InputItem type='password' placeholder="Please enter the password" >Password:</InputItem>
                    </List>
                    <WhiteSpace size="lg"></WhiteSpace>
                    <WhiteSpace size="xl"></WhiteSpace>
                    <WhiteSpace size="xl"></WhiteSpace>
                    <WhiteSpace size="xl"></WhiteSpace>
                    <WhiteSpace size="xl"></WhiteSpace>
                    <Button type="primary">Login</Button>
                    <WhiteSpace size="lg"></WhiteSpace>
                    <Button>Create an account</Button>
                </WingBlank>
            </div>
        )
    }
}