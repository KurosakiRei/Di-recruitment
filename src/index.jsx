import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import store from './redux/store'
import Main from '../src/containers/interfaces/main-interface'
import Login from '../src/containers/interfaces/login-interface'
import Register from '../src/containers/interfaces/register-interface'

render( 
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