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
        groupId: record.groupId || null,
        userId: record.user_id || null,
        tabId: currentStore.tabs.active
      });
    });
  }
}
