import { connect } from 'react-redux'

import Login from '../../components/login/login'

export default connect(
    state=>({state}),
    {}
)(Login)