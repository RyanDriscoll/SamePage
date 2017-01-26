import React from 'react';
import { render } from 'react-dom';
import ButtonComponent from './react/buttoncomponent.jsx';


const chatButton = document.createElement('div');

document.body.insertBefore(chatButton, null);

chatButton.id = '$$chatButton';



render(
  <ButtonComponent />,
  document.getElementById('$$chatButton')
);

