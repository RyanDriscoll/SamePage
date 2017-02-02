import { GET_USER, GET_MSG, CHANGE_ACTIVE } from './tabs.js';
import rootPath from './httpServer.jsx';
import axios from 'axios';
import store from './store.js';
// tabs action creators
export const get_user = (users, userIds, tabId, groupId) => {
  return {
    type: GET_USER,
    userIds: userIds,
    groupId: groupId,
    tabId: tabId,
    users: users
  }
}

export const get_msg = (messages, messageIds, tabId, groupId) => {
  return {
    type: GET_MSG,
    messages: messages,
    messageIds: messageIds,
    tabId: tabId,
    groupId: groupId
  }
}

export const change_active = (tabId) => {
  return {
    type: CHANGE_ACTIVE,
    tabId: tabId
  }
}

// tabs dispatchers
export const getUser = (tabId, groupId) => {
	axios.get(rootPath + 'groups/group_users', {params: {groupId}})
  .then(res => res.data)
  .then(foundUsers => {
    const userIds = foundUsers.map(user => user.id);
    store.dispatch(get_user(foundUsers, userIds, tabId, groupId));
  })
  .catch(err => console.error(`Getting users for group ${groupId} unsuccessful`, err));
};

export const getMsg = (tabId, groupId) => {
	axios.get(rootPath + 'messages', {params: {groupId}})
  .then(res => res.data)
  .then(foundMessages => {
    const messageIds = foundMessages.map(message => message.id);
    store.dispatch(get_msg(foundMessages, messageIds, tabId, groupId));
  })
  .catch(err => console.error(`Getting Messages for group ${groupId} unsuccessful`, err));
};

// export const removeGroup = (tabId, groupId) => {
//   // return (dispatch) => {
//     axios.delete(rootPath + `groups/${groupId}`)
//     .then(() => store.dispatch(remove_group(tabId, groupId)))
//     .catch(err => console.error(err.stack))
//   // }
// }

export const addGroup = (url, name) => {
	if (name === undefined) name = url;
  const currentStore = store.getState();
	axios.post('/api/groups', {name: name, url: url, userId: currentStore.auth.id})
		.then(res => res.data)
		.then((group) => {
      store.dispatch({
        type: ADD_GROUP,
        group: group,
        tabId: currentStore.tabs.active
      }
      .then(() => store.dispatch({
        type: ADD_USER,
        groupId: group.id,
        userId: currentStore.auth.id
    })
		.catch(err => console.error(`Creating group ${name} for ${url} unsuccessful`, err));
};