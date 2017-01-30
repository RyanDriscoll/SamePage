import { wrapStore } from 'react-chrome-redux'
import store from './store';

const log = console.log.bind(console, 'BACKGROUND_MESSAGE >');

chrome.extension.onConnect.addListener(function(port) {
  log("Connected .....");
  port.onMessage.addListener(log);
  
});

// chrome.runtime.onMessage.addListener(function(request, sender, response){
//   if(request.type === 'joinRoom'){
//     log("SENDER------>>>>>>", sender.url)
//   }
// })

export default wrapStore(store, {portName: 'rakt'});