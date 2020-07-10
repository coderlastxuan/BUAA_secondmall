import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {Switch, Route, BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'

import Login from './containers/login/login'
import Register from './containers/register/register'
import Main from './containers/main/main'
import store from './redux/store'

import './assets/css/index.css'

ReactDOM.render(
  <Provider store={store}>
      <BrowserRouter>
          <Switch>
              <Route path='/login' component={Login}/>
              <Route path='/register' component={Register}/>
              <Route component={Main}/>
          </Switch>
      </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
