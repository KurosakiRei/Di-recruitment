import { connect } from 'react-redux'

import { toGetUser } from '../../redux/actions'
import Main from '../../components/main/main'

export default connect(
    state=>({user:state.user}),
    {toGetUser}
)(Main)