import socket from './io';
import store from '../store';
const actions = ['add', 'update', 'remove', 'get'];
import {getUser, getMsg } from '../actionAndDispatch.js';
import {REMOVE_GROUP, REMOVE_TAB} from '../tabs.js';

export default function(table) {
  for (const action of actions) {
    socket.on(`${action}:${table}`, record => {
      const currentStore = store.getState();
      if (table === 'user' && record.user_id === currentStore.auth.id) {
        return;
      }
      if(`${action}:${table}` == 'remove:user') console.log('REMOVE USER!', record)
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

export function socketListeners(){
  socket.on('joinGroupFromServer', groups => {
    let currentStore = store.getState();
    store.dispatch({
      type: 'ADD_GROUP',
      group: groups, //
      tabId: currentStore.tabs.active
    });
    getMsg(currentStore.tabs.active, groups.map(group => group.id));
    getUser(currentStore.tabs.active, groups.map(group => group.id)) //why not include users w groups instead?
    // store.dispatch({ //????
    //   type: 'ADD_USER',
    //   groupId: group.id,
    //   user: currentStore.auth,
    //   tabId: currentStore.tabs.active
    // });

  })

  socket.on('leaveGroupFromServer', (groupId, tabId) => {
    let currentStore = store.getState();    
    store.dispatch({type: REMOVE_GROUP, tabId: tabId, groupId})
  })

  socket.on('closeTabFromServer', (tabId) => {
    let currentStore = store.getState();    
    store.dispatch({type: REMOVE_TAB, tabId: tabId})
  })

}
