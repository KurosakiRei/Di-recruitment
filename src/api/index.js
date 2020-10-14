import ajax from './ajax'

export const Login = (userData) => ajax('/login', 'POST', userData)
export const Register = (userData) => ajax('/register', 'POST', userData)