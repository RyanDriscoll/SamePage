import socket from './io';
import store from '../store';
const actions = ['add', 'update', 'remove'];


export default function(table) {
  for (const action of actions) {
    socket.on(`${action}:${table}`, record => {
      console.log("---->>>>>", record)
      store.dispatch({
        type: `${action.toUpperCase()}_${table.toUpperCase()}`,
        [table]: record
      });
    })
  }
}
