import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import RecruiterInfo from '../../containers/interfaces/recruiter-info-interface'
import SeekerInfo from '../../containers/interfaces/seeker-info-interface'

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

/*
 
*/