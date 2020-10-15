import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { List, Grid } from 'antd-mobile'

export default class AvatarSelector extends Component{

    constructor(props){
        super(props)
        
        this.state = {
            avatar:null
        }

        this.avatarList = []

        for(let i=1;i<=20;i++){
            this.avatarList.push({
                icon:require(`../../assets/images/avatars/avatar${i}.png`),
                text:`avatar${i}`
            })
        }
    }

    static propTypes = {
        updateAvatar: PropTypes.func.isRequired,
    }
    

    setAvatar = ({icon, text}) => {
        this.setState({avatar:icon})
        this.props.updateAvatar(text)
    }

    render() {
        const {avatar} = this.state
        const displayAvatar = avatar?<p>Choose an avatar: <img src={avatar} alt='avatar'/></p>:'Choose an avatar:'
        return (
            <div>
                <List renderHeader={displayAvatar}>
                    <Grid data={this.avatarList} columnNum={5} onClick={avatar => this.setAvatar(avatar)}>
                    </Grid>
                </List>
            </div>
        )
    }
}