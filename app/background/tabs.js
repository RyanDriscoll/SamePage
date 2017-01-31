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
      return Object.assign({}, tabs, {[action.tabId]: {[action.groupId]: {users: action.users, messages: action.messages}}})
    case REMOVE_GROUP:
      let newTabsObj = Object.assign({}, tabs);
      delete newTabsObj[action.tabId];
      return newTabsObj;
    default:
      return tabs;
  }
}

const add_group = (group, tabId) => { 
  return {
    type: ADD_GROUP, 
    groupId: group.id,
    tabId: tabId,
    users: group.users,
    messages: group.messages,
  }
};

export const joinGroup = (userId, groupId)