import React from 'react';
import { render } from 'react-dom';
import MainContainer from './react/maincontainer';



let bodyChildren = document.body.children;
console.log("_________>>>>>>>>>>>>> \n", bodyChildren);
document.body.innerHTML = '';

let anchor = document.createElement('div');
anchor.id = 'lastbody';
let newBody = document.createElement('div');
newBody.id = 'wholePage';

for(let i=0; i< bodyChildren.length; i++){
  console.log(bodyChildren[i]);
  newBody.insertBefore(bodyChildren[i], null);
}

document.body.insertBefore(newBody, null);
document.body.insertBefore(anchor, null);
newBody.style.width = '80%';
anchor.style.width = '19%';





const wrapAll = function(elms) {
  var el = elms.length ? elms[0] : elms;
  // Cache the current parent and sibling of the first element.
  var parent  = el.parentNode;
  var sibling = el.nextSibling;
  // Wrap the first element (is automatically removed from its
  // current parent).
  this.appendChild(el);
  // Wrap all other elements (if applicable). Each element is
  // automatically removed from its current parent and from the elms
  // array.
  while (elms.length) {
      this.appendChild(elms[0]);
  }
  // If the first element had a sibling, insert the wrapper before the
  // sibling to maintain the HTML structure; otherwise, just append it
  // to the parent.
  if (sibling) {
      parent.insertBefore(this, sibling);
  } else {
      parent.appendChild(this);
  }
};







render(
  <MainContainer />,
  document.getElementById('lastbody')
);
