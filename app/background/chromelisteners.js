import store from './store.js';
import { addGroup, change_active, getMsg, getUser, removeUser } from './actionAndDispatch.js';
import { ADD_GROUP } from './groups.js';
import { CHANGE_ACTIVE, REMOVE_TAB, REMOVE_GROUP } from './tabs.js';
import socket from './sockets/io';


export default function setListeners(){
  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
    let currentStore = store.getState()
    if(currentStore.auth && changeInfo.url){
      let currTab = currStore.tabs[tabId];
      for (let groupId in currTab){
        if(groupId == 'activeGroup') continue;
        let deleteGroup = true;
        for (let tab in currStore.tabs){
          if(tab == tabId || tab == 0 || tab == 'active') continue;
          if(currStore.tabs[tab][groupId]) {
            deleteGroup = false;
            break;
          }
        }
        if (deleteGroup) socket.emit('leaveGroup', {group_id: groupId, user_id: currStore.auth.id})
      }
      // socket.emit('leaveGroup', {group_id: currentStore.tabs[tabId].activeGroup, user_id: currentStore.auth.id})
    }
  })

  chrome.tabs.onActivated.addListener(function({tabId, windowId}){
    store.dispatch(change_active(tabId));
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, {action: "rerender"}, function(response) {});  
    });
  });

  chrome.runtime.onMessage.addListener(function(request, sender, response){
    if (request.type === 'joinRoom'){
      addGroup(sender.url, request.name)
    }
  });

  chrome.tabs.onRemoved.addListener(function(tabId){
    let currStore = store.getState()
    let currTab = currStore.tabs[tabId];
    for (let groupId in currTab){
      if(groupId == 'activeGroup') continue;
      let deleteGroup = true;
      for (let tab in currStore.tabs){
        if(tab == tabId || tab == 0 || tab == 'active') continue;
        if(currStore.tabs[tab][groupId]) {
          deleteGroup = false;
          break;
        }
      }
      if (deleteGroup) socket.emit('leaveGroup', {group_id: groupId, user_id: currStore.auth.id})
    } 
  })
}
