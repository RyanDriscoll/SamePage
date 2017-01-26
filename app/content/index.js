import React from 'react';
import { render } from 'react-dom';
import ButtonComponent from './react/buttoncomponent.jsx';
import {Provider} from 'react-redux';
import {Store} from 'react-chrome-redux';

const chatButton = document.createElement('div');

document.body.insertBefore(chatButton, null);

chatButton.id = '$$chatButton';

const store = new Store({portName: 'rakt'});

render(
  <Provider store={store}>
    <ButtonComponent />
  </Provider>,
  document.getElementById('$$chatButton')
);

