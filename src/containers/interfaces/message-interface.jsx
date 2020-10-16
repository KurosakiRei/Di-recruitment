import { connect } from 'react-redux'

import Message from '../../components/message/message'

export default connect(
    state => ({state})
)(Message)