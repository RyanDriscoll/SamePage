import React from 'react';
import { render } from 'react-dom';
import MainContainer from './react/maincontainer';


const chatButton = document.createElement('div');

document.body.insertBefore(chatButton, null);

chatButton.id = '$$chatButton';








render(
  <MainContainer />,
  document.getElementById('$$chatButton')
);

