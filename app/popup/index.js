import React from 'react';
import { render } from 'react-dom';
import PopupContainer from './react/PopupContainer.jsx';
import Signup from './react/Signup.jsx';
import Landing from './react/Landing.jsx';
import {Provider} from 'react-redux';
import {Store} from 'react-chrome-redux';
import { Router, Route, hashHistory } from 'react-router';

const proxyStore = new Store({portName: 'rakt'})

const log = console.log.bind(console, 'POPUP_MESSAGE >');
chrome.extension.onConnect.addListener(function(port) {
  log("Connected .....");
  port.onMessage.addListener(log);
});

render(
  <Provider store={proxyStore}>
    <Router history={hashHistory}>
      <Route path='/' component={PopupContainer} />
      <Route path='/signup' component={Signup} />
      <Route path='/landing' component={Landing} />
    </Router>
  </Provider>,
  document.getElementById('raktpopup')
);

