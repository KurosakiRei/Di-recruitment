import { AUTH_SUCCEEDED, ERR_MSG } from './action-types'
import { Login, Register } from '../api/index'


const authSucceeded = (userData) => ({ type: AUTH_SUCCEEDED, data: userData })
const errMsg = (message) => ({ type: ERR_MSG, data: message })


export const toRegister = ({ username, password, rePassword, userType }) => {
    if (!username || !password || !rePassword || !userType) {
        return errMsg('Please make sure that there is no empty in all fields')
    }
    if (password !== rePassword) {
        return errMsg('Please make sure that the password entered twice is the same')
    }

    return async dispatch => {
        const response = await Register({ username, password, userType })
        if (response.data.code === '0') {
            dispatch(authSucceeded(response.data.data))
        } else {
            dispatch(errMsg(response.data.data))
        }
    }
}

export const toLogin = ({ username, password }) => {
    if (!username || !password) {
        return errMsg('The username and password are required')
    }

    return async dispatch => {
        const response = await Login({ username, password })
        if (response.data.code === '0') {
            dispatch(authSucceeded(response.data.data))
        } else {
            dispatch(errMsg(response.data.data))
        }
    }
}