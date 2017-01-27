import React from 'react';
import { render } from 'react-dom';
import ButtonComponent from './react/buttoncomponent.jsx';
import {Provider} from 'react-redux';
import {Store} from 'react-chrome-redux';
import proxyStore from '../background'

const chatButton = document.createElement('div');

document.body.insertBefore(chatButton, null);

chatButton.id = '$$chatButton';



render(
  <Provider store={proxyStore}>
    <ButtonComponent />
  </Provider>,
  document.getElementById('$$chatButton')
);

