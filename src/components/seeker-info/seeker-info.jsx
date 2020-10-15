import React, { Component } from 'react'
import { 
    NavBar,
    List,
    InputItem,
    Button,
    TextareaItem,
    WhiteSpace
} from 'antd-mobile'

import AvatarSelector from '../avatar-selector/avatar-selector'

export default class SeekerInfo extends Component{
    state={
        avatar:'',
        position:'',
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
                    <InputItem labelNumber={10} onChange={val=>{this.updateState('position',val)}}>Objective:</InputItem>
                    <TextareaItem title='Self-introduction:' labelNumber={10} rows={3} onChange={val=>{this.updateState('info',val)}}></TextareaItem>
                </List>
                <WhiteSpace size='xl' />
                <Button type='primary' onClick={this.toUpdateProfile}>Save</Button>
                
            </div>
        )
    }
}