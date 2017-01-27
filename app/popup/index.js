import React from 'react';
import { render } from 'react-dom';
import Popup from './react/popup.jsx';
import {Provider} from 'react-redux';
import {Store} from 'react-chrome-redux';

const proxyStore = new Store({portName: 'rakt'})

const log = console.log.bind(console, 'POPUP_MESSAGE >');
chrome.extension.onConnect.addListener(function(port) {
  log("Connected .....");
  port.onMessage.addListener(log);
});

render(
  <Provider store={proxyStore}>
    <Popup />
  </Provider>,
  document.getElementById('raktpopup')
);

