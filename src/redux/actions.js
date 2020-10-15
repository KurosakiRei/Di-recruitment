import { AUTH_SUCCEEDED, ERR_MSG, UPDATE_USER, RESET_USER } from './action-types'
import { login, register, update } from '../api/index'


const authSucceeded = userData => ({ type: AUTH_SUCCEEDED, data: userData })
const updateUser = userData => ({ type: UPDATE_USER, data: userData })
const resetUser = message => ({ type: RESET_USER, data: message })
export const errMsg = message => ({ type: ERR_MSG, data: message })



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