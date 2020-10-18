import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {NavBar, List, InputItem, Icon, Grid} from 'antd-mobile'


const Item = List.Item

export default class Chat extends Component{

    state={
        content:'',
        showEmojis:false
    }


    static propTypes = {
        user: PropTypes.object.isRequired,
        messageList: PropTypes.object.isRequired,
        toSendMessage: PropTypes.func.isRequired,
        toReadMessage: PropTypes.func.isRequired,
    }

    // Scroll to the bottom after the user entered
    componentDidMount(){
        window.scrollTo(0, document.body.scrollHeight)
        this.emojis = ['😀','😃','😁','😆','😅','🤣','😂','🙂','🙃'
        ,'😉','😊','😇','🥰','😍','🤩','😘','😗','😋','😚','😙','😝'
        ,'🤫','😉','😊','😇','🥰','😍','🤩','😘','😗','😋','😚','😙',
        '😝'].map(each => ({text:each}))
    }

    // Scroll to the bottom after the user sent the message
    componentDidUpdate(){
        window.scrollTo(0, document.body.scrollHeight)
    }

    componentWillUnmount(){
        const {user} = this.props
        const {userid} = this.props.match.params
        this.props.toReadMessage({from:userid, to:user._id})
    }

    toSend = () => {
        const from = this.props.user._id
        const to = this.props.match.params.userid
        const content = this.state.content.trim()
        if(content){
            this.props.toSendMessage({from, to, content})
            this.setState({showEmojis:false})
            this.setState({content:''})
        }
    }

    toggleEmojis = () =>{
        const showEmojis = !this.state.showEmojis
        this.setState({showEmojis})

        // Antd-mobile resize bug solution
        if(showEmojis){
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'))
            }, 0)
        }
    }
    

    render() {
        const {users, chatMsgs} = this.props.messageList
        const myId = this.props.user._id
        const targetId = this.props.match.params.userid
        if(!users[myId]){
            return null
        }
        const chat_id = [myId, targetId].sort().join('_')
        const targetAvatar = users[targetId].avatar?require(`../../assets/images/avatars/${users[targetId].avatar}.png`):null
        return (
            <div id='chat-page'>
                <NavBar 
                    icon={<Icon type='left'/>}
                    onLeftClick={() => this.props.history.goBack()}
                    className='stick-top'
                >
                    {users[targetId].username}
                </NavBar>
                    <List style={{marginTop:50, marginBottom:50}}>
                        {chatMsgs.filter(each => each.chat_id === chat_id).map(each => {
                            if(each.from === targetId){
                                return (
                                <Item
                                    key={each.create_time}
                                    thumb={targetAvatar}
                                >
                                    {each.content}
                                </Item>)
                            }else{
                                return (
                                <Item
                                    key={each.create_time}
                                    className='chat-me'
                                    extra='me'
                                    >
                                    {each.content}
                                </Item>)
                            }
                        })}
                    </List>
                <div className='am-tab-bar'>
                    <InputItem
                    placeholder="enter text..."
                    value={this.state.content}
                    onChange={content => this.setState({content})}
                    onFocus = {()=>{this.setState({showEmojis:false})}}
                    extra={
                        <span>
                            <span role="img" aria-label="emojis" onClick={this.toggleEmojis}>😀</span>
                            <span onClick={this.toSend}>Send</span>
                        </span>
                    
                    }
                    />
                    {this.state.showEmojis?<Grid
                    data={this.emojis}
                    columnNum={8}
                    carouselMaxRow={4}
                    isCarousel={true}
                    onClick={(item) => {
                    this.setState({content: this.state.content + item.text})
                    }}
                    />:null}
                </div>
            </div>
        )
    }

}