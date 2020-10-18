import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { 
    Toast,
    WhiteSpace,
    WingBlank,
    Card,
} from 'antd-mobile'
import { withRouter } from 'react-router-dom'

import '../../assets/css/utils.css'


class UserList extends Component{

    static propTypes = {
        user: PropTypes.object.isRequired,
        userList: PropTypes.array.isRequired,
        errMsg: PropTypes.func.isRequired,
        toGetUserList: PropTypes.func.isRequired,
    }

    componentDidMount (){
        // Get the user list according to the user tyoe
        let {userType} = this.props.user
        this.props.toGetUserList(userType==='recruiter'?'seeker':'recruiter')
    }

    componentDidUpdate(){
        const {user, errMsg} = this.props
        if(user.errMsg){
            Toast.fail(user.errMsg,1.5)
            errMsg('')
        }
    }


    render() {
        const {user, userList} = this.props
        return (
        <WingBlank style={{marginTop: 50, marginBottom: 50}} size="lg" >
            {/*Filter off the users who didn't set the profile*/}
            {userList.filter(each => each.avatar).map((each, index) => <div key={each.username}>
                    <WhiteSpace />
                        <Card onClick={()=>{this.props.history.push(`/chat/${each._id}`)}}>
                            <Card.Header
                                thumb={each.avatar?require(`../../assets/images/avatars/${each.avatar}.png`):null}
                                extra={each.username}
                            />
                            {user.userType === 'recruiter'?<Card.Body>
                                {each.position?<div>Objective:{each.position}</div>:null}
                                {each.info?<div>Self-introduction:{each.info}</div>:null}
                            </Card.Body>:
                            <Card.Body>
                                {each.position?<div>Recruiting:{each.position}</div>:null}
                                {each.company?<div>Company:{each.company}</div>:null}
                                {each.salary?<div>Salary:{each.salary}</div>:null}
                                {each.info?<div>Requirements:{each.info}</div>:null}
                            </Card.Body>}
                        </Card>
                    <WhiteSpace />
                </div>)
            }
        </WingBlank>
        )
    }
}

export default withRouter(UserList)