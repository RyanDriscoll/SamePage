import { wrapStore } from 'react-chrome-redux'
import store from './store';
import listeners from './chromelisteners.js';
listeners();



export default wrapStore(store, {portName: 'rakt'});