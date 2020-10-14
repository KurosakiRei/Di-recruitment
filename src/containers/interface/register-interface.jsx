import { connect } from 'react-redux'

import Register from '../../components/register/register'
import {toRegister} from '../../redux/actions'

export default connect(
    state => ({user: state.user}),
    {toRegister}
)(Register)