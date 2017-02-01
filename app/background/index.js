import { wrapStore } from 'react-chrome-redux'
import store from './store';
import {addGroup} from './tabs.js';


export var activeRaktTabId;

const log = console.log.bind(console, 'POPUP_MESSAGE >');
chrome.extension.onConnect.addListener(function(port) {
  log("Connected .....");
  port.onMessage.addListener(log);
});



chrome.tabs.onActivated.addListener(function({tabId, windowId}){
	activeRaktTabId = tabId;
  if(!store.tabs[tabId]) store.dispatch({type:'ADD_TAB', tabId});
})

chrome.runtime.onMessage.addListener(function(request, sender, response){
  if(request.type === 'joinRoom'){
		// urlsOfTabs[sender.tab.id] = sender.url;
		addGroup(sender.url, sender.tab.id, request.user)
  }
	// console.log("onMessage", urlsOfTabs)
})

export default wrapStore(store, {portName: 'rakt'});