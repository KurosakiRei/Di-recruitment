import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {List, Badge} from 'antd-mobile'
import QueueAnim from 'rc-queue-anim'

const Item = List.Item
const Brief = Item.Brief

function categorizeLatestMsgs(chatMsgs,myId){
    let latestMsgs = {}
    // Categorize the same chat
    chatMsgs.map(each =>{

        each.unreads = (!each.read&&each.to===myId) ? 1:0

        const latestMsg = latestMsgs[each.chat_id]
        if(!latestMsg){
            latestMsgs[each.chat_id] = each
        }else{
            let unreads = latestMsg.unreads + each.unreads
            if(each.create_time > latestMsg.create_time){
                latestMsgs[each.chat_id] = each
            }
            latestMsgs[each.chat_id].unreads = unreads
        }
        return each
    })

    // Sort the messages
    latestMsgs = Object.values(latestMsgs).sort((m1,m2) =>{
        return m2.create_time - m1.create_time
    })
    return latestMsgs

}

export default class Message extends Component{

    static propTypes = {
        user: PropTypes.object.isRequired,
        messageList: PropTypes.object.isRequired,
    }

    render() {
        const {user} = this.props
        const {users, chatMsgs} = this.props.messageList
        const myId = user._id
        const messageList = categorizeLatestMsgs(chatMsgs, myId)
        return (
            <List style={{marginTop:50, marginBottom:50}}>
                <QueueAnim type='top' >
                {messageList?messageList.map(each => {
                    const targetId = each.from === myId ? each.to:each.from
                    const targetAvatar = users[targetId].avatar?require(`../../assets/images/avatars/${users[targetId].avatar}.png`):null
                return(
                    <Item
                    onClick={()=>this.props.history.push(`/chat/${targetId}`)}
                    key = {each.chat_id}
                    extra={<Badge text={each.unreads}/>}
                    thumb={targetAvatar}
                    arrow='horizontal'
                    >
                    {users[targetId].username}
                        <Brief>{each.content}</Brief>
                    </Item>
                )
                }):null}
                </QueueAnim>
            </List>
        )
    }   
}