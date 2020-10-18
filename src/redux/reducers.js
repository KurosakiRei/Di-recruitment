import { combineReducers } from 'redux'

import { AUTH_SUCCEEDED, ERR_MSG, UPDATE_USER, RESET_USER, RECEIVE_USER_LIST, RECEIVE_MSG_LIST, RECEIVE_MSG, MARK_AS_READ } from './action-types'

const initUser = {
    username: '',
    userType: '',
    avatar: '',
    errMsg: '',
    redirect: ''
}

function user(state = initUser, actions) {
    switch (actions.type) {
        case AUTH_SUCCEEDED:
            const { avatar } = state
            const { userType } = actions.data
            return {...actions.data, redirect: avatar ? `/${userType}` : `/${userType}_info` } // Update the state and redirect URL
        case ERR_MSG:
            return {...state, errMsg: actions.data }
        case UPDATE_USER:
            return actions.data
        case RESET_USER:
            return {...initUser, errMsg: actions.data }
        default:
            return state
    }
}

const initUserList = []

function userList(state = initUserList, actions) {
    switch (actions.type) {
        case RECEIVE_USER_LIST:
            return actions.data
        default:
            return state
    }
}

const initMessageList = {
    users: {},
    chatMsgs: [],
    unReads: 0
}

function messageList(state = initMessageList, actions) {
    switch (actions.type) {
        case RECEIVE_MSG_LIST:
            const { users, chatMsgs, myId } = actions.data
            return {
                users,
                chatMsgs,
                unReads: chatMsgs.reduce((total, each) => total + (!each.read && each.to === myId), 0)
            }
        case RECEIVE_MSG:
            const { message } = actions.data
            return {
                users: state.users,
                chatMsgs: [...state.chatMsgs, message],
                unReads: state.unReads + (!message.read && message.to === actions.data.myId ? 1 : 0)
            }

        case MARK_AS_READ:
            const { from, to, num } = actions.data
            return {
                users: state.users,
                chatMsgs: state.chatMsgs.map(each => {
                    if (each.from === from && each.to === to && !each.read) {
                        return {...each, read: true }
                    } else {
                        return each
                    }
                }),
                unReads: state.unReads - num
            }
        default:
            return state
    }
}


export default combineReducers({ user, userList, messageList })