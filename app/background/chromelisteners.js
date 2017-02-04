import store from './store.js';
import { addGroup, change_active, getMsg, getUser, removeUser } from './actionAndDispatch.js';
import { ADD_GROUP } from './groups.js';
import { CHANGE_ACTIVE, REMOVE_TAB } from './tabs.js';
// const log = console.log.bind(console, 'POPUP_MESSAGE >');
// chrome.extension.onConnect.addListener(function(port) {
//   log("Connected .....");
//   port.onMessage.addListener(log);
// });

// chrome.runtime.onMessage.addListener(function(request, sender, response){
//   if(request.type === 'joinRoom'){
//     log("SENDER------>>>>>>", sender.url)
//   }
// })
// chrome.tabs.onUpdate.addListener(function(sender){
// 	activeRaktTabId = tabId;
//   // console.log("------store", store.getState(), tabId)
//   if(!store.getState().tabs[tabId]) store.dispatch({type:'ADD_TAB', tabId});
// })

export default function setListeners(){
  chrome.tabs.onActivated.addListener(function({tabId, windowId}){
    store.dispatch(change_active(tabId));
    // console.log("------store", store.getState(), tabId)
    // if (!store.getState().tabs[tabId]) {
    //   store.dispatch({type: ADD_GROUP, })
    // }
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
      let deleteGroup = true;
      for (let tab in currStore.tabs){
        if(tab === tabId || tab === 0 || tab === 'active') continue;
        if(currStore.tabs[tab][groupId]) {
          console.log('in for loops', groupId, tab)
          deleteGroup = false;
          break;
        }
      }
      if (deleteGroup) removeUser(groupId, currStore.auth.id)
    } 
    store.dispatch({type: REMOVE_TAB, tabId: tabId})
  })
}
