import { connect } from 'react-redux'

import Chat from '../../components/chat/chat'
import { toSendMessage, toReadMessage  } from '../../redux/actions'

export default connect(
    state=>({user:state.user, messageList: state.messageList}),
    {toSendMessage, toReadMessage}
)(Chat)