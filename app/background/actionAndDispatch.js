import { GET_USER } from './users.js';
import { GET_MSG } from './messages.js';
import { GET_CIRCLE } from './circles.js';
import { CHANGE_ACTIVE } from './tabs.js';
import rootPath from './httpServer.jsx';
import axios from 'axios';
import store from './store.js';
import socket from './sockets/io';

/* ------------   ACTION CREATORS     ------------------ */

export const get_user = (users, userIds, tabId, groupIds) => {
  return {
    type: GET_USER,
    userIds: userIds,
    groupIds: groupIds,
    tabId: tabId,
    users: users
  }
}

export const get_msg = (messages, messageIds, tabId, groupIds) => {
  return {
    type: GET_MSG,
    messages: messages,
    messageIds: messageIds,
    tabId: tabId,
    groupIds: groupIds
  }
}

export const change_active = (tabId) => {
  return {
    type: CHANGE_ACTIVE,
    tabId: tabId
  }
}

export const getUser = (tabId, groups) => {
	axios.get(rootPath + 'groups/group_users', {params: {groups}})
  .then(res => res.data)
  .then(foundUsers => {
    const users = foundUsers.map(groupUser => groupUser.user);
    const userIds = users.map(user => user.id);
    store.dispatch(get_user(foundUsers, userIds, tabId, groups));
  })
  .catch(err => console.error(`Getting users for groups unsuccessful`, err));
};


export const getMsg = (tabId, groups) => {
	axios.get(rootPath + 'messages', {params: {groups}})
  .then(res => res.data)
  .then(foundMessages => {
    const messageIds = foundMessages.reduce((obj, msg) => {
      if(obj[msg.group_id]) obj[msg.group_id].messages.push(msg);
      else obj[msg.group_id] = {messages: [msg]}
        // obj[msg.group_id] = {};
        // obj[msg.group_id].messages = [msg];
      return obj;
		}, {})
    const users = foundMessages.map(message => message.user);
    store.dispatch(get_msg(foundMessages, messageIds, tabId, groups));
    store.dispatch(get_user(users, null, null, null));
  })
  .catch(err => console.error(`Getting Messages for groups unsuccessful`, err));
};


export const addGroup = url => {
  console.log("addgroup before emit")
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