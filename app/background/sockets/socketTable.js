import socket from './io';
import store from '../store';
const actions = ['add', 'update', 'remove', 'get'];


export default function(table) {
  for (const action of actions) {
    socket.on(`${action}:${table}`, record => {
      console.log('inside socket on---record', record)
      // console.log("---->>>>>", record);
      const currentStore = store.getState();
      if (table === 'user' && record.user_id === currentStore.auth.id) {
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

  socket.on('joinGroup', group => {
    let currentStore = store.getState();
    console.log('why isnt this working???', currentStore.tabs.active);
    store.dispatch({
      type: 'ADD_GROUP',
      group: group,
      tabId: currentStore.tabs.active
    });
    getUser(currentStore.tabs.active, group.id)
    getMsg(currentStore.tabs.active, group.id);
    store.dispatch({
      type: 'ADD_USER',
      groupId: group.id,
      user: currentStore.auth,
      tabId: currentStore.tabs.active
    });
  })

  socket.on('leaveGroup', (groupId) => {
    store.dispatch({type: REMOVE_GROUP, tabId: currentStore.tabs.active, groupId})
  })

}

