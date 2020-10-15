import { connect } from 'react-redux'

import SeekerInfo from '../../components/seeker-info/seeker-info'
import { toUpdate, errMsg} from '../../redux/actions'

export default connect(
    state => ({user: state.user}),
    {toUpdate, errMsg}
)(SeekerInfo)