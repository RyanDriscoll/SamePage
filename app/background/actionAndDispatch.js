import { GET_USER } from './users.js';
import { GET_MSG } from './messages.js';
import { GET_CIRCLE } from './circles.js';
import { CHANGE_ACTIVE } from './tabs.js';
import rootPath from './httpServer.jsx';
import axios from 'axios';
import store from './store.js';
import socket from './sockets/io';

/* ------------   ACTION CREATORS     ------------------ */

export const get_user = (users, tabId) => {
  return {
    type: GET_USER,
    tabId: tabId,
    users: users,
    userId: store.getState().auth.id
  }
}

export const get_msg = (messages, tabId) => {
  return {
    type: GET_MSG,
    messages: messages,
    tabId: tabId,
  }
}

export const change_active = (tabId) => {
  return {
    type: CHANGE_ACTIVE,
    tabId: tabId
  }
}

export const getUser = (tabId, groups) => {
  console.log("tabIdkkkkkkkkkkkkkkkkkk",tabId)
	axios.get(rootPath + 'groups/group_users', {params: {groups}})
  .then(res => res.data)
  .then(foundUsers => {
    store.dispatch(get_user(foundUsers, tabId));
  })
  .catch(err => console.error(`Getting users for groups unsuccessful`, err));
};

export const getMsg = (tabId, groups) => {
	axios.get(rootPath + 'messages', {params: {groups}})
  .then(res => res.data)
  .then(foundMessages => {
    store.dispatch(get_msg(foundMessages, tabId));
    store.dispatch(get_user(foundMessages, null));
  })
  .catch(err => console.error(`Getting Messages for groups unsuccessful`, err));
};

export const addGroup = url => {
  let circleIds = Object.keys(store.getState().circles).filter(id => id != 0)
  socket.emit('joinGroup', {url, circleIds, user_id: store.getState().auth.id});
};

export const removeUser = (groupId, userId) => {
  axios.delete(rootPath + 'groups/users', {data: {groupId, userId}})
  .catch(err => console.log(err, err.stack))
}

export const getCircle = user_id => {
  axios.get(rootPath + 'circles', {params: {user_id: user_id}})
  .then (res => res.data)
  .then(circles => {
    let mappedCircles = circles.map( (circle) => circle.circle )
    store.dispatch({type: GET_CIRCLE, circles: mappedCircles})
  })
  .catch(err => console.error(`Error fetching circles for user ${user_id} unsuccessful`, err))
}