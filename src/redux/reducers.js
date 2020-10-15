import { combineReducers } from 'redux'

import { AUTH_SUCCEEDED, ERR_MSG } from './action-types'

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

            // Update the state and redirect URL
            return {...actions.data, redirect: avatar ? `/${userType}` : `/${userType}_info` }
        case ERR_MSG:
            return {...state, errMsg: actions.data }
        default:
            return state
    }
}

export default combineReducers({ user })