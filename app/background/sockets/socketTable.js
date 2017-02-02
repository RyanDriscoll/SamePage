import socket from './io';
import store from '../store';
const actions = ['add', 'update', 'remove'];


export default function(table) {
  for (const action of actions) {
    socket.on(`${action}:${table}`, record => {
      // console.log("---->>>>>", record);
      const currentStore = store.getState();
      store.dispatch({
        type: `${action.toUpperCase()}_${table.toUpperCase()}`,
        [table]: record.row,
        groupId: record.groupId ? record.groupId : Object.keys(currentStore.tabs[currentStore.tabs.active].groups)[0],
        tabId: currentStore.tabs.active
      });
    });
  }
}
