import { combineReducers } from 'redux'

import { DEFAULT } from './action-types'

function main(state = 0, actions) {
    switch (actions.type) {
        case DEFAULT:
            return state
        default:
            return state
    }
}

export default combineReducers({ main })