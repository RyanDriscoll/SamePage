import { wrapStore } from 'react-chrome-redux'
import store from './store';

const log = console.log.bind(console, 'BACKGROUND_MESSAGE >');

chrome.extension.onConnect.addListener(function(port) {
  log("Connected .....");
  port.onMessage.addListener(log);
});

export default wrapStore(store, {portName: 'rakt'});