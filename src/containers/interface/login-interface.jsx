import { connect } from 'react-redux'

import Login from '../../components/login/login'
import {toLogin, errMsg} from '../../redux/actions'

export default connect(
    state=>({user:state.user}),
    {toLogin, errMsg}
)(Login)