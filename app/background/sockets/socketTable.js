import socket from './io';
import store from '../store';
const actions = ['add', 'update', 'remove', 'get'];


export default function(table) {
  for (const action of actions) {
    socket.on(`${action}:${table}`, record => {
      // console.log("---->>>>>", record);
      const currentStore = store.getState();
      if (`${action}:${table}` === 'add:user' && record.row.id === currentStore.auth.id) {
        return;
      }
      if (`${action}:${table}` === 'add:user') {
        console.log('add user record', record)
      }
      store.dispatch({
        type: `${action.toUpperCase()}_${table.toUpperCase()}`,
        [table]: record.row,
        groupId: record.groupId || Object.keys(currentStore.tabs[currentStore.tabs.active].groups)[0],
        tabId: currentStore.tabs.active
      });
    });
  }
}
