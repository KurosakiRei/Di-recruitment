import ajax from './ajax'

export const login = (userData) => ajax('/login', userData, 'POST')
export const register = (userData) => ajax('/register', userData, 'POST')
export const update = (userData) => ajax('/update', userData, 'POST')
export const getUser = () => ajax('/user')
export const getUserList = (userType) => ajax('/userlist', userType)
export const getMessageList = () => ajax('/msglist')