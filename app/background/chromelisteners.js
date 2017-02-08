import store from './store.js';
import { addGroup, change_active, getMsg, getUser, removeUser } from './actionAndDispatch.js';
import { ADD_GROUP } from './groups.js';
import { CHANGE_ACTIVE, REMOVE_TAB, REMOVE_GROUP } from './tabs.js';
import socket from './sockets/io';





export default function setListeners(){
  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
    let currStore = store.getState()
    if(currStore.auth && changeInfo.url){
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
      // socket.emit('leaveGroup', {group_id: currStore.tabs[tabId].activeGroup, user_id: currStore.auth.id})
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
      // urlsOfTabs[sender.tab.id] = sender.url;
      addGroup(sender.url, request.name)
    }
    if (request.type === 'sendChat'){
      socket.emit('addMsg', {
        content: request.content,
        user_id: store.getState().auth.id,
        group_id: request.group_id
      });
    }
    // console.log("onMessage", urlsOfTabs)
  });

  chrome.tabs.onRemoved.addListener(function(tabId){
	  //remove tab from tabs store
    //then, traverse other tabs to see if that group exists
    //if it doesnt, leave group.
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
    // socket.on('leaveGroup', (groupId) => {
    //   store.dispatch({type: REMOVE_TAB, tabId: tabId})
    // })
  })
}
