import store from './store.js';
import { addGroup, change_active, getMsg, getUser, removeUser } from './actionAndDispatch.js';
import { ADD_GROUP } from './groups.js';
import { CHANGE_ACTIVE, REMOVE_TAB, REMOVE_GROUP, SWITCH_ACTIVE_GROUP } from './tabs.js';
import socket from './sockets/io';


export default function setListeners(){
  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
    let currStore = store.getState()
    if(currStore.auth && changeInfo.url){
      let currTab = currStore.tabs[tabId];
      for (let groupId in currTab){
        if(groupId == 'activeGroup' || groupId == 'main') continue;
        let deleteGroup = true;
        for (let tab in currStore.tabs){
          if(tab == tabId || tab == 0 || tab == 'active') continue;
          if(currStore.tabs[tab][groupId]) {
            deleteGroup = false;
            break;
          }
        }
        if (deleteGroup) {
          socket.emit('leaveGroup', {group_id: groupId, user_id: currStore.auth.id, tabId: tabId});
        }
        socket.emit('doneTyping', {username: store.getState().auth.username, group: groupId})          
      }
    }
  })

  chrome.tabs.onActivated.addListener(function({tabId, windowId}){
    store.dispatch(change_active(tabId));
    if (Object.keys(store.tabs[tabId]) > 3){
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
          chrome.tabs.sendMessage(tabs[0].id, {action: "rerender"}, function(response) {});  
      });
    }
  });

  chrome.runtime.onMessage.addListener(function(request, sender, response){
    if (request.type === 'joinRoom'){
      addGroup(sender.url)
    }else if(request.type === 'changeActiveGroup'){
      store.dispatch({
        type: SWITCH_ACTIVE_GROUP,
        groupId: request.groupId
      })
    }else if(request.type === 'typing'){
      socket.emit('typing', {username: store.getState().auth.username, group: request.groupId})
    }else if(request.type === 'doneTyping'){
      socket.emit('doneTyping', {username: store.getState().auth.username, group: request.groupId})
    }else if(request.type === 'logout'){
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, {action: "displayChatboxFalse"}, function(response) {});  
      });
      socket.emit('leaveAllGroups', {
        groupIds: Object.keys(store.getState().groups).filter(id=>id), 
        user_id: store.getState().auth.id
      });
    }
  });

  chrome.tabs.onRemoved.addListener(function(tabId){
    let currStore = store.getState()
    let currTab = currStore.tabs[tabId];
    for (let groupId in currTab){
      if(groupId == 'activeGroup' || groupId == 'main') continue;
      let deleteGroup = true;
      for (let tab in currStore.tabs){
        if(tab == tabId || tab == 0 || tab == 'active') continue;
        if(currStore.tabs[tab][groupId]) {
          deleteGroup = false;
          break;
        }
      }
      socket.emit('closeTab', {
        group_id: groupId, 
        user_id: currStore.auth.id, 
        tabId: tabId, 
        removeGroup: deleteGroup
      })
      socket.emit('doneTyping', {
        username: store.getState().auth.username, 
        group: groupId
      })
    }
  })
}
