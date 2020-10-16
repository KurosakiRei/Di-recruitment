import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { 
    NavBar,
    List,
    InputItem,
    Button,
    TextareaItem,
    WhiteSpace,
    Toast
} from 'antd-mobile'
import {Redirect} from 'react-router-dom'

import AvatarSelector from '../avatar-selector/avatar-selector'

export default class SeekerInfo extends Component{
    state = {
        avatar:'',
        position:'',
        info:''
    }

    static propTypes = {
        user: PropTypes.object.isRequired,
        errMsg: PropTypes.func.isRequired,
        toUpdate: PropTypes.func.isRequired,
    }

    componentDidUpdate(){
        const {user, errMsg} = this.props
        if(user.errMsg){
            Toast.fail(user.errMsg,1.5)
            errMsg('')
        }
    }

    updateAvatar = avatar => {
        this.setState({avatar})
    }

    updateState = (type, val) => {
        this.setState({[type]:val})
    }


    toUpdateProfile = () => {
        this.props.toUpdate(this.state)
    }

    render() {
        const {user} = this.props
        if(user.avatar){
            return <Redirect to='/seeker'/>
        }
        return (
            <div>
                <NavBar>Personal information</NavBar>
                <List>
                    <AvatarSelector updateAvatar={this.updateAvatar}/>
                    <InputItem labelNumber={10} onChange={val=>{this.updateState('position',val)}}>Objective:</InputItem>
                    <TextareaItem title='Self-introduction:' labelNumber={10} rows={3} onChange={val=>{this.updateState('info',val)}}></TextareaItem>
                </List>
                <WhiteSpace size='xl' />
                <Button type='primary' onClick={this.toUpdateProfile}>Save</Button>
                
            </div>
        )
    }
}