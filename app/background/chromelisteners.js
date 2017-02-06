import store from './store.js';
import { addGroup, change_active, getMsg, getUser, removeUser } from './actionAndDispatch.js';
import { ADD_GROUP } from './groups.js';
import { CHANGE_ACTIVE, REMOVE_TAB, REMOVE_GROUP } from './tabs.js';
import socket from './sockets/io';





export default function setListeners(){
  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
    let currentStore = store.getState()
    console.log("in updated listener------------------------------", tabId, changeInfo.url)
    if(currentStore.auth && changeInfo.url){
      console.log("in updated listener if statement------------------------------", tabId, changeInfo.url)      
      socket.emit('leaveGroup', {groupId: currentStore.tabs[tabId].activeGroup, userId: currentStore.auth.id})
      // socket.on('leaveGroup', (groupId) => {
      //   store.dispatch({type: REMOVE_GROUP, tabId: currentStore.tabs.active, groupId})
      // })
      // addGroup(changeInfo.url, changeInfo.url)
    }
  })

  chrome.tabs.onActivated.addListener(function({tabId, windowId}){
    store.dispatch(change_active(tabId));
  });

  chrome.runtime.onMessage.addListener(function(request, sender, response){
      console.log("helll1111111111")
    if (request.type === 'joinRoom'){
      console.log("helll222222222222")
      // urlsOfTabs[sender.tab.id] = sender.url;
      addGroup(sender.url, request.name)
    }
    // console.log("onMessage", urlsOfTabs)
  });

  chrome.tabs.onRemoved.addListener(function(tabId){
	  //remove tab from tabs store
    //then, traverse other tabs to see if that group exists
    //if it doesnt, leave group.
    console.log('deleted tab--------')
    let currStore = store.getState()
    let currTab = currStore.tabs[tabId];
    for (let groupId in currTab){
      if(groupId == 'activeGroup') continue;
      let deleteGroup = true;
      console.log('in 1st for loop', groupId)
      for (let tab in currStore.tabs){
        if(tab == tabId || tab == 0 || tab == 'active') continue;
        if(currStore.tabs[tab][groupId]) {
          console.log('in for loops', groupId, tab, tabId)
          deleteGroup = false;
          break;
        }
      }
      console.log('outside for loops', currStore.auth.id)
      if (deleteGroup) socket.emit('leaveGroup', {groupId, userId: currStore.auth.id})
    } 
    // socket.on('leaveGroup', (groupId) => {
    //   store.dispatch({type: REMOVE_TAB, tabId: tabId})
    // })
  })
}
