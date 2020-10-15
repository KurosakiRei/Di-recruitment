import ajax from './ajax'

export const login = (userData) => ajax('/login', 'POST', userData)
export const register = (userData) => ajax('/register', 'POST', userData)
export const update = (userData) => ajax('/update', 'POST', userData)