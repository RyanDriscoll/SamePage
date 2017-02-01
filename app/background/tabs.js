import rootPath from './httpServer.jsx'
import axios from 'axios';


const ADD_GROUP = 'ADD_GROUP';
const REMOVE_GROUP = 'REMOVE_GROUP';
const ADD_USER = 'ADD_USER';
const REMOVE_USER = 'REMOVE_USER';
const ADD_MSG = 'ADD_MSG';
//const REMOVE_MSG = 'REMOVE_MSG';

export default function reducer (tabs = {}, action) {
	switch (action.type) {
    case ADD_GROUP:
      return Object.assign({}, tabs, action.payload)
    case REMOVE_GROUP:
    //change this later to have gross nested object.assigns    
      let newTabsObj = Object.assign({}, tabs);
      delete newTabsObj[action.tabId][action.groupId];
      return newTabsObj;
    case ADD_USER:
      return Object.assign({}, tabs, {[action.tabId]: 
              Object.assign({}, tabs[action.tabId][action.groupId], {[action.groupId]:
                Object.assign({}, tabs[action.tabId][action.groupId][users], {[action.userId]: 1})}
            )})
    case REMOVE_USER:
    //change this later to have gross nested object.assigns
      let newObj = Object.assign({}, tabs);
      delete newObj[action.tabId][action.groupId][users][action.userId];
      return newObj;
    case ADD_MSG:
      return Object.assign({}, tabs, {[action.tabId]: 
              Object.assign({}, tabs[action.tabId][action.groupId], {[action.groupId]:
                Object.assign({}, tabs[action.tabId][action.groupId][messages], {[action.messageId]: 1})}
            )})
    default:
      return tabs;
  }
}

export const add_group = (tabId, group) => {
  return {
    type: ADD_GROUP, 
    payload:{
      [tabId]: {
        [group.id]: {
          users: group.users,
          messages: group.messages,
        }
      }
    }
  }
};

export const remove_group = (tabId, groupId) => {
  return {
    type: REMOVE_GROUP, 
    tabId: tabId,
    groupId: groupId
  }
};

export const add_user = (tabId, groupId, userId) => {
  return {
    type: ADD_USER,
    userId: userId,
    groupId: groupId,
    tabId: tabId
  }
}

export const add_msg = (tabId, groupId, messageId) => {
  return {
    type: ADD_MSG,
    messageId: messageId,
    groupId: groupId,
    tabId: tabId
  }
}

export const remove_user = (tabId, groupId, userId) => {
  return {
    type: REMOVE_USER,
    userId: userId,
    groupId: groupId,
    tabId: tabId
  }
}


//----------------    dispatchers   -------------------

export const addGroup = (groupUrl, tabId, userId) => {
  return (dispatch) => {
    axios.post('api/groups', {url: groupUrl, name: groupUrl, userId: userId})
    .then(response => response.data)
    .then(group => dispatch(add_group(tabId, group)))
    .catch(err => console.error(err.stack))
  }
}

export const removeGroup = (tabId, groupId) => {
  return (dispatch) => {
    axios.delete(`api/groups/${groupId}`)
    .then(() => dispatch(remove_group(tabId, groupId)))
    .catch(err => console.error(err.stack))
  }
}
