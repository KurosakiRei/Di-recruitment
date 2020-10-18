import { AUTH_SUCCEEDED, ERR_MSG, UPDATE_USER, RESET_USER, RECEIVE_USER_LIST, RECEIVE_MSG_LIST, RECEIVE_MSG, READ_MSG } from './action-types'
import { login, register, update, getUser, getUserList, getMessageList } from '../api/index'
import io from 'socket.io-client'


const authSucceeded = userData => ({ type: AUTH_SUCCEEDED, data: userData })
const updateUser = userData => ({ type: UPDATE_USER, data: userData })

const receiveUserList = userList => ({ type: RECEIVE_USER_LIST, data: userList })
const updateMessageList = ({ users, chatMsgs }) => ({ type: RECEIVE_MSG_LIST, data: { users, chatMsgs } })
const receiveMessage = message => ({ type: RECEIVE_MSG, data: message })
const readMessage = ({ from, to, num }) => ({ type: READ_MSG, data: { from, to, num } })

export const resetUser = message => ({ type: RESET_USER, data: message })
export const errMsg = message => ({ type: ERR_MSG, data: message })


const initIO = (dispatch, myId) => {
    if (!io.socket) {
        io.socket = io('ws://localhost:4000')
        io.socket.on('receiveMsg', message => {
            if (message.from === myId || message.to === myId) {
                dispatch(receiveMessage(message))
            }
        })
    }
}


export const toSendMessage = ({ from, to, content }) => {
    return dispatch => {
        io.socket.emit('sendMsg', { from, to, content })
    }
}

const toGetMessageList = async(dispatch, myId) => {
    initIO(dispatch, myId)
    const response = await getMessageList()
    if (response.data.code === 0) {
        dispatch(updateMessageList(response.data.data))
    }
}



export const toRegister = ({ username, password, rePassword, userType }) => {
    if (!username || !password || !rePassword || !userType) {
        return errMsg('Please make sure that there is no empty in all fields')
    }
    if (password !== rePassword) {
        return errMsg('Please make sure that the password entered twice is the same')
    }

    return async dispatch => {
        const response = await register({ username, password, userType })
        if (response.data.code === 0) {
            console.log(response.data._id)
            toGetMessageList(dispatch, response.data.data._id)
            dispatch(authSucceeded(response.data.data))
        } else {
            dispatch(errMsg(`The username already exists`))
        }
    }
}

export const toLogin = ({ username, password }) => {
    if (!username || !password) {
        return errMsg('The username and password are required')
    }

    return async dispatch => {
        const response = await login({ username, password })
        if (response.data.code === 0) {
            toGetMessageList(dispatch, response.data.data._id)
            dispatch(authSucceeded(response.data.data))
        } else {
            dispatch(errMsg(response.data.msg))
        }
    }
}

export const toUpdate = ({ avatar, ...userData }) => {
    if (!avatar) {
        return errMsg('Please choose an avatar')
    }
    return async dispatch => {
        const response = await update({ avatar, ...userData })
        if (response.data.code === 0) {
            dispatch(updateUser(response.data.data))
        } else {
            dispatch(resetUser(response.data.msg))
        }
    }
}

export const toGetUser = () => {
    return async dispatch => {
        const response = await getUser()
        if (response.data.code === 0) {
            console.log(response.data._id)
            toGetMessageList(dispatch, response.data.data._id)
            dispatch(updateUser(response.data.data))
        } else {
            dispatch(resetUser(response.data.msg))
        }
    }
}

export const toGetUserList = userType => {
    return async dispatch => {
        const response = await getUserList({ userType })
        if (response.data.code === 0) {
            dispatch(receiveUserList(response.data.data))
        } else {
            dispatch(errMsg(response.data.msg))
        }

    }
}