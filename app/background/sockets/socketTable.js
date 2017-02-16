import socket from './io';
import store from '../store';
const actions = ['add', 'update', 'remove', 'get'];
import {getUser, getMsg } from '../actionAndDispatch.js';
import {REMOVE_GROUP, REMOVE_TAB, LOGOUT} from '../tabs.js';

export default function(table) {
  for (const action of actions) {
    socket.on(action + ':' + table, record => {
      const currentStore = store.getState();
      if (action + ':' + table == 'add:user') console.log("lll", record.userId)
      store.dispatch({
        type: action.toUpperCase() + '_' + table.toUpperCase(),
        [table]: record[table] || null,
        groupId: record.groupId || null,
        userId: record.userId || null,
        tabId: currentStore.tabs.active
      });
    });
  }
}

export function socketListeners(){

  socket.on('logoutFromServer', () => {
    store.dispatch({type: LOGOUT})
  })

  socket.on('typing', ({username, group}) => {
    let tabStore = store.getState().tabs
    if(group == tabStore[tabStore.active].activeGroup){
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabStore.active, {username, action: 'typing'}, function(res) {})
      });
    }
  })

  socket.on('doneTyping', ({username, group}) => {
    let tabStore = store.getState().tabs
    if(group == tabStore[tabStore.active].activeGroup){
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabStore.active, {username, action: 'doneTyping'}, function(res) {})
      });
    }
  })

  socket.on('joinGroupFromServer', groups => {
    console.log("wwwwwwtfffffs")
    let currentStore = store.getState();
    store.dispatch({
      type: 'ADD_GROUP',
      groups: groups, //
      tabId: currentStore.tabs.active
    });
    getMsg(currentStore.tabs.active, groups.map(group => group.id));
    getUser(currentStore.tabs.active, groups.map(group => group.id)) //why not include users w groups instead?
  })

  socket.on('leaveGroupFromServer', (groupId, tabId) => {
    store.dispatch({type: REMOVE_GROUP, tabId: tabId, groupId})
  })

  socket.on('closeTabFromServer', (tabId) => {
    store.dispatch({type: REMOVE_TAB, tabId: tabId})
  })

}
