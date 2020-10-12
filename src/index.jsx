import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter,Switch,Route } from 'react-router-dom'

import store from './redux/store'
import Main from '../src/containers/interface/main-interface'
import Login from '../src/containers/interface/login-interface'
import Register from '../src/containers/interface/register-interface'

ReactDOM.render( 
<Provider store={store}>
    <BrowserRouter>
        <Switch>
            <Route path="/login" component={Login}></Route>
            <Route path="/register" component={Register}></Route>
            <Route component={Main}></Route>
        </Switch>
    </BrowserRouter>
</Provider>, 
document.getElementById('root'))