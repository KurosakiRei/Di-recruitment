import { connect } from 'react-redux'

import Recruiter from '../../components/recruiter/recruiter'

export default connect(
    state => ({state})
)(Recruiter)