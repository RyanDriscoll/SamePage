import store from './store.js';
import { addGroup, change_active } from './actionAndDispatch.js';
import { ADD_GROUP } from './groups.js';
import { CHANGE_ACTIVE } from './tabs.js';
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

chrome.tabs.onActivated.addListener(function({tabId, windowId}){
  store.dispatch(change_active(tabId));
  // console.log("------store", store.getState(), tabId)
  // if (!store.getState().tabs[tabId]) {
  //   store.dispatch({type: ADD_GROUP, })
  // }
});

chrome.runtime.onMessage.addListener(function(request, sender, response){
  if (request.type === 'joinRoom'){
		// urlsOfTabs[sender.tab.id] = sender.url;
		addGroup(sender.url, request.name)
  }
	// console.log("onMessage", urlsOfTabs)
});