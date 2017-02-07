import React from 'react';
import { render } from 'react-dom';
import ButtonComponent from './react/buttoncomponent.jsx';
import {Provider} from 'react-redux';
import {Store} from 'react-chrome-redux';

const chatButton = document.createElement('div');

document.body.insertBefore(chatButton, null);

chatButton.id = '$$chatButton';

const proxyStore = new Store({portName: 'rakt'})

render(
  <Provider store={proxyStore}>
    <ButtonComponent store={proxyStore} />
  </Provider>,
  document.getElementById('$$chatButton')
);

