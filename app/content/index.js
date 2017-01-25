import React from 'react';
import { render } from 'react-dom';
import MainContainer from './react/maincontainer';


const anchor = document.createElement('div');
anchor.id = 'lastbody';

document.body.insertBefore(anchor, null);
document.body.css = {
  background: red,
  padding: '0px 300px 0px 0px'
  }


render(
  <MainContainer />,
  document.getElementById('lastbody')
);
