import { combineReducers } from 'redux'

import { AUTH_SUCCEEDED, ERR_MSG } from './action-types'

const initUser = {
    username: '',
    type: '',
    errMsg: '',
    redirect: ''
}

function user(state = initUser, actions) {
    switch (actions.type) {
        case AUTH_SUCCEEDED:
            return {...actions.data, redirect: '/' }
        case ERR_MSG:
            return {...state, errMsg: actions.data }
        default:
            return state
    }
}

export default combineReducers({ user })