import socket from './io';
import store from '../store';
const actions = ['add', 'update', 'remove', 'get'];


export default function(table) {
  for (const action of actions) {
    socket.on(`${action}:${table}`, record => {
      // console.log("---->>>>>", record);
      const currentStore = store.getState();
      if (table === 'user' && record.userId === currentStore.auth.id) {
        return;
      }

      store.dispatch({
        type: `${action.toUpperCase()}_${table.toUpperCase()}`,
        [table]: record.row || null,
        groupId: record.groupId /*|| Object.keys(currentStore.tabs[currentStore.tabs.active].groups)[0]*/,
        userId: record.userId || null,
        tabId: currentStore.tabs.active
      });
    });
  }
}
