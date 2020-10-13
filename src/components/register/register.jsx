import React, { Component } from 'react'
import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Picker,
    Button
    } from 'antd-mobile'

import Logo from '../logo/logo'

export default class Register extends Component{


    userType=[ {
        label:
        (<div>
          <span>Boss</span>
        </div>)
      },
      {
        label:
        (<div>
          <span>Geeker</span>
        </div>)
      }]



    render() {
        return (
            <div>
                <NavBar>Di-recruitment</NavBar>
                <Logo/>
                <WingBlank>
                    <List>
                        <InputItem placeholder="Please enter the username" >Username:</InputItem>
                        <InputItem type='password' placeholder="Please enter the password" >Password:</InputItem>
                        <InputItem type='password' labelNumber={10} placeholder="Please re-enter the password" >Re-password:</InputItem>
                        <Picker
                            data={this.userType}
                            cols={1}
                            okText='OK'
                            dismissText='Cancel'
                            >
                            <List.Item arrow="horizontal">Type:</List.Item>
                        </Picker>
                    </List>
                    <WhiteSpace></WhiteSpace>
                    <Button type="primary">Register</Button>
                    <WhiteSpace size="lg"></WhiteSpace>
                    <Button>Already have an account</Button>
                </WingBlank>
            </div>
        )
    }
}