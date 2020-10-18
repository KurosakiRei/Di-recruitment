import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'
import { 
    NavBar 
} from 'antd-mobile'

import TabFooter from '../../components/tab-footer/tab-footer'
import NotFound from '../../components/not-found/not-found'

import Recruiter from '../../containers/interfaces/recruiter-interface'
import Seeker from '../../containers/interfaces/seeker-interface'
import Message from '../../containers/interfaces/message-interface'
import Profile from '../../containers/interfaces/profile-interface'
import RecruiterInfo from '../../containers/interfaces/recruiter-info-interface'
import SeekerInfo from '../../containers/interfaces/seeker-info-interface'
import Chat from '../../containers/interfaces/chat-interface'

import '../../assets/css/utils.css'

export default class Main extends Component{

    static propTypes = {
        user: PropTypes.object.isRequired,
        toGetUser: PropTypes.func.isRequired,
        unReads: PropTypes.number.isRequired,
    }

    tabList = [
        {
            path: '/recruiter',
            componet: Recruiter,
            title: 'Job seekers',
            icon: 'seeker',
            tab: 'Seekers',
            hide: false
        },
        {
            path: '/seeker',
            componet: Seeker,
            title: 'Recruiters',
            icon: 'recruiter',
            tab: 'Recruiters',
            hide: false
        },
        {
            path: '/message',
            componet: Message,
            title: 'Messages',
            icon: 'message',
            tab: 'Messages',
            hide: false
        },
        {
            path: '/profile',
            componet: Profile,
            title: 'Profile',
            icon: 'profile',
            tab: 'Profile',
            hide: false
        },

    ]

    componentDidMount(){
        const userid = Cookies.get('userid')
        const {user, toGetUser} = this.props
        if(userid && !user._id){
            toGetUser()
        }
    }


    render() {

        // Return to Login page since there is no userid in the cookie
        const userid = Cookies.get('userid')
        if(!userid){
            return <Redirect to='/login'/>
        }

        const {_id, avatar, userType} = this.props.user
        const {pathname} = this.props.location
        if(!_id){
            // Waiting for autologin
            return null
        }else{
            // Calculating the correct redirect page
            if(pathname === '/'){
                return <Redirect to={avatar ? `/${userType}` : `/${userType}_info`}/>
            }
        }

        const {tabList} = this
        // Calculate the current tab page
        const currentTab = tabList.find(each=> each.path === pathname)

        // Guarantee the user stays on a correct page 
        userType === 'recruiter' ? tabList[1].hide = true: tabList[0].hide = true
        const incorrectPage = tabList.filter(each => each.hide === true)[0].path
        if(pathname === incorrectPage){
            return <Redirect to='/'/>
        } 

        return (
            <div>
                {currentTab?<NavBar className='stick-top'>{currentTab.title}</NavBar>:null} 
                <Switch>
                    {tabList.map((each, index) =>
                        <Route path={each.path} component={each.componet} key={index}></Route>
                    )}
                    <Route path='/recruiter_info' component={RecruiterInfo}></Route>
                    <Route path='/seeker_info' component={SeekerInfo}></Route>
                    <Route path='/chat/:userid' component={Chat}></Route>
                    <Route component={NotFound}></Route>
                </Switch>
                {currentTab?<TabFooter unReads={this.props.unReads} tabList={tabList}></TabFooter>:null}
            </div>
        )
    }
}

/*
 
*/