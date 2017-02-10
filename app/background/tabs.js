/* -----------------    CONSTANTS     ------------------ */

export const ADD_USER = 'ADD_USER';
export const GET_USER = 'GET_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const REMOVE_TAB = 'REMOVE_TAB';
export const REMOVE_GROUP = "REMOVE_GROUP";
export const ADD_MSG = 'ADD_MSG';
export const GET_MSG = 'GET_MSG';
export const ADD_GROUP = 'ADD_GROUP';
export const CHANGE_ACTIVE = 'CHANGE_ACTIVE';
export const SWITCH_ACTIVE_GROUP = 'SWITCH_ACTIVE_GROUP';

const initialState = {
  active: 0,
  0: {
    activeGroup: 0,
    main: 0,
    0: { 
      circle: null, 
      users:[], 
      messages: [] },
  }
}
export default function reducer (tabs = initialState, action) {
	switch (action.type) {
    case ADD_USER: {
      let newTabs = Object.assign({}, tabs);
      for(let tab in newTabs){
        if(newTabs[tab][action.groupId] && newTabs[tab][action.groupId].users.indexOf(action.user.id)<0){
          newTabs = Object.assign({}, newTabs, {[tab]:
            Object.assign({}, newTabs[tab], {[action.groupId]:
              Object.assign({}, newTabs[tab][action.groupId], {users:
                [...newTabs[tab][action.groupId].users, action.userId]
              })
            })
          });
        } 
      }
      return newTabs;
      // else {
      //   return tabs;
      // }
    }
    case SWITCH_ACTIVE_GROUP:{
      let newActiveGroup = Object.assign({}, tabs, tabs[tabId]);
      newActiveGroup.activeGroup = groupId;
      return newActiveGroup;
    }
    case REMOVE_USER: {
      let newTabs = Object.assign({}, tabs)
        for(let tab in newTabs){
          if(tab == 'active' || tab == 0) continue;
          if(tabs[tab][action.groupId]) {
            newTabs[tab][action.groupId].users.filter(id => id != action.userId);
          }
        }
      return newTabs;
      // return Object.assign({}, tabs, {[tabForRemoveUser]:
      //         Object.assign({}, tabs[tabForRemoveUser], {[action.groupId]:
      //           Object.assign({}, tabs[tabForRemoveUser][action.groupId], {users:
      //             tabs[tabForRemoveUser][action.groupId].users.filter(id => id !== action.userId)
      //           })
      //         })
      //       });
    }
    case GET_USER: {
      if(!action.tabId) return tabs;
      let newTab = Object.assign({}, tabs[action.tabId]);
      for (let user in action.users){
        for (let group in action.groups){
          if(user.group_id === group) newTab[group].users.push(user.id);
        }
      }
			return newTab;
      // Object.assign({}, tabs, {[action.tabId]:
      //   Object.assign({}, tabs[action.tabId], {[action.groupId]:
      //     Object.assign({}, tabs[action.tabId][action.groupId], {users:
      //       [...action.userIds]})
      //   })
      // });
    }
    case ADD_MSG: {
      let newTabs = Object.assign({}, tabs);
      for(let tab in newTabs){
        if(newTabs[tab][action.groupId]){
          newTabs = Object.assign({}, newTabs, {[tab]:
            Object.assign({}, newTabs[tab], {[action.groupId]:
              Object.assign({}, newTabs[tab][action.groupId], {messages:
                [...newTabs[tab][action.groupId].messages, action.msg.id]
              })
            })
          });
        }
      }
      return newTabs;
      // let tabForMessage;
      // for(let tab in tabs){
      //   if(tabs[tab][action.msg.group_id]) {
      //     tabForMessage = tab;
      //     break;
      //   }
      // }
      // return Object.assign({}, tabs, {[tabs.active]:
      //   Object.assign({}, tabs[tabs.active], {[action.msg.group_id]:
      //     Object.assign({}, tabs[tabs.active][action.msg.group_id], {messages:
      //       [...tabs[tabForMessage][action.msg.group_id].messages, action.msg.id]})
      //   })
      // });
    }

    //  action --->>>>>> 
    // messageIds, groupId, tabId

    case GET_MSG: {
			return Object.assign({}, tabs, {
        [action.tabId]: Object.assign({}, tabs[action.tabId], action.messageIds)
        // {
        //   [action.groupId]: Object.assign({}, tabs[action.tabId][action.groupId], {
        //     messages: [...action.messageIds]
        //   })
        // })
      });
    }
    case ADD_GROUP:
      return Object.assign({}, tabs, {
        [action.tabId]: Object.assign({}, ...groups.map(group => {
          if(group.circle_id){
            return {[group.id]: {circle: group.circle_id, users: [], messages: []}}
          }else return {
            activeGroup: action.group.id, 
            main: action.group.id, 
            [group.id]: {circle: null, users: [], messages: []}
          }
        }))
      })
    case REMOVE_TAB:
      let newTabs = Object.assign({}, tabs);
      delete newTabs[action.tabId];
      return newTabs;
    case REMOVE_GROUP:{
      let removeGroup = Object.assign({}, tabs);
      removeGroup[action.tabId] = {}
      removeGroup[action.tabId].activeGroup = 0;
      removeGroup[action.tabId].main = 0;
      return removeGroup;
    }
    case CHANGE_ACTIVE: {
      let newTab
      if(tabs[action.tabId]){
        newTab = {active: action.tabId}
      } else{
        newTab = {active: action.tabId, [action.tabId]: {}}
      }
      return Object.assign({}, tabs, newTab);
    }
    default: {
      return tabs;
    }
  }
}