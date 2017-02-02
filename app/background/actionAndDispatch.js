import { GET_USER, GET_MSG, CHANGE_ACTIVE } from './tabs.js';
import rootPath from './httpServer.jsx';
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
export const addGroup = (groupUrl, tabId, user_id) => {
  // return (dispatch) => {
    axios.post(rootPath + 'groups', {url: groupUrl, name: groupUrl, user_id: user_id})
    .then(response => response.data)
    .then(group => {
      store.dispatch(add_group(tabId, group));
    })
    .catch(err => console.error(err.stack))
  // }
}

export const removeGroup = (tabId, groupId) => {
  // return (dispatch) => {
    axios.delete(rootPath + `groups/${groupId}`)
    .then(() => store.dispatch(remove_group(tabId, groupId)))
    .catch(err => console.error(err.stack))
  // }
}