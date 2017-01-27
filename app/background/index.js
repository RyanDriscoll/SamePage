import { wrapStore } from 'react-chrome-redux'
import store from './store'

export default wrapStore(store, {portName: 'rakt'})