import React, { Component } from 'react'
import { 
    NavBar,
    List,
    InputItem,
    Button,
    WhiteSpace,
    TextareaItem 
} from 'antd-mobile'

import AvatarSelector from '../avatar-selector/avatar-selector'


export default class RecruiterInfo extends Component{

    state={
        avatar:'',
        position:'',
        company:'',
        salary:'',
        info:''
    }

    updateAvatar = avatar => {
        this.setState({avatar})
    }

    updateState = (type, val) => {
        this.setState({[type]:val})
    }

    toUpdateProfile = () => {
        console.log(this.state)
    }

    render() {
        return (
            <div>
                <NavBar>Personal information</NavBar>
                <List>
                    <AvatarSelector updateAvatar={this.updateAvatar}/>
                    <InputItem labelNumber={10} onChange={val=>{this.updateState('position',val)}}>Recruiting:</InputItem>
                    <InputItem labelNumber={10} onChange={val=>{this.updateState('company',val)}}>Company:</InputItem>
                    <InputItem labelNumber={10} onChange={val=>{this.updateState('salary',val)}}>Salary:</InputItem>
                    <TextareaItem title='Requirements:' labelNumber={10} rows={3} onChange={val=>{this.updateState('info',val)}}></TextareaItem>
                </List>
                <WhiteSpace size='xl' />
                <Button type='primary' onClick={this.toUpdateProfile}>Save</Button>
                
            </div>
        )
    }
}