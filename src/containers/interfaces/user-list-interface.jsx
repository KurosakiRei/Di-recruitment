import { connect } from 'react-redux'

import UserList from '../../components/user-list/user-list'
import { toGetUserList, errMsg } from '../../redux/actions'

export default connect(
    state => ({user: state.user, userList: state.userList}),
    { toGetUserList, errMsg }
)(UserList)