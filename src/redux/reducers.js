import { combineReducers } from 'redux'

import { AUTH_SUCCEEDED, ERR_MSG, UPDATE_USER, RESET_USER, RECEIVE_USER_LIST, RECEIVE_MSG_LIST, RECEIVE_MSG } from './action-types'

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
            return {...actions.data, unReads: state.unReads }
        case RECEIVE_MSG:
            return {
                users: state.users,
                chatMsgs: [...state.chatMsgs, actions.data],
                unReads: state.unReads
            }
        default:
            return state
    }
}


export default combineReducers({ user, userList, messageList })