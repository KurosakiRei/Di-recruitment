import React, { Component } from 'react'

import logo from '../../assets/images/logo/logo.svg'
import '../../assets/css/logo.css'

export default class Logo extends Component{
    render() {
        return (
            <div className="logo-container">
                <img src={logo} alt="logo" className='logo-img'/>
            </div>
        )
    }
}