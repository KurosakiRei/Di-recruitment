import React, { Component } from 'react'
import { Button, WhiteSpace, Result, Icon } from 'antd-mobile'

export default class NotFound extends Component {
    render() {
        return (
            <div>
                <WhiteSpace />
                <Result
                    img={<Icon type="cross-circle-o" className="spe" style={{ fill: '#F13642' }} />}
                    title="Page Not Found"
                    message="Click the button below to return"
                />
                <WhiteSpace />
                <Button type= 'primary' onClick={()=>{this.props.history.replace('/')}}>Return to homepage</Button>
            </div>
        )
    }   
}