import React from 'react';
import { render } from 'react-dom';
import Popup from './react/popup.jsx';
import {Provider} from 'react-redux';
import {Store} from 'react-chrome-redux';

const proxyStore = new Store({portName: 'rakt'})


render(
  <Provider store={proxyStore}>
    <Popup />
  </Provider>,
  document.getElementById('raktpopup')
);

