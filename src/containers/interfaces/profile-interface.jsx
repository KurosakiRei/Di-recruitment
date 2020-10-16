import { connect } from 'react-redux'

import Profile from '../../components/profile/profile'
import { resetUser } from '../../redux/actions'

export default connect(
    state => ({user:state.user}),
    {resetUser}
)(Profile)