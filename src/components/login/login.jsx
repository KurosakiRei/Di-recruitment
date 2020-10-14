import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    Toast,
    NavBar,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Button
    } from 'antd-mobile'
import {Redirect} from 'react-router-dom'

import Logo from '../logo/logo'

export default class Login extends Component{

    state={
        username:'',
        password:'',
    }

    static propTypes = {
        user: PropTypes.object.isRequired,
        toLogin: PropTypes.func.isRequired,
    }

    // Display the error message
    componentDidUpdate(){
        const {user, errMsg} = this.props
        if(user.errMsg){
            Toast.fail(JSON.stringify(user.errMsg),1.5)
            errMsg('')
        }
        console.log(user.userType)
    }

    updateState = (type, val) =>{
        this.setState({[type]:val})
    }

    toLogin = () =>{
        this.props.toLogin(this.state)
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