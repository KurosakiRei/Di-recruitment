import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import RecruiterInfo from '../recruiter-info/recruiter-info'
import SeekerInfo from '../seeker-info/seeker-info'

export default class Main extends Component{
    render() {
        return (
            <div>
                <Switch>
                    <Route path='/recruiter_info' component={RecruiterInfo}></Route>
                    <Route path='/seeker_info' component={SeekerInfo}></Route>
                </Switch>
            </div>
        )
    }
}