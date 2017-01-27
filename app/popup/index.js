import React from 'react';
import { render } from 'react-dom';
import Popup from './react/popup.jsx';
import {Provider} from 'react-redux';
import proxyStore from '../background/index.js';


render(
  <Provider store={proxyStore}>
    <Popup />
  </Provider>,
  document.getElementById('raktpopup')
);

