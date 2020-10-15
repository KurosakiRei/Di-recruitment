import { connect } from 'react-redux'

import RecruiterInfo from '../../components/recruiter-info/recruiter-info'
import { toUpdate, errMsg } from '../../redux/actions'

export default connect(
    state => ({user: state.user}),
    {toUpdate, errMsg}
)(RecruiterInfo)