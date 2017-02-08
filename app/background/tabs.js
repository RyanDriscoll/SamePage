/* -----------------    CONSTANTS     ------------------ */

// const ADD_GROUP = 'ADD_GROUP';
// const REMOVE_GROUP = 'REMOVE_GROUP';
export const ADD_USER = 'ADD_USER';
export const GET_USER = 'GET_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const REMOVE_TAB = 'REMOVE_TAB';
export const REMOVE_GROUP = "REMOVE_GROUP";
export const ADD_MSG = 'ADD_MSG';
export const GET_MSG = 'GET_MSG';
export const ADD_GROUP = 'ADD_GROUP';
export const CHANGE_ACTIVE = 'CHANGE_ACTIVE';

const initialState = {
  active: 0,
  0: {
    0:{
      users:[],
      messages: []
    },
    activeGroup: 0
  }
}
export default function reducer (tabs = initialState, action) {
	switch (action.type) {
    case ADD_USER: {
      let tabForUser;
      for(let tab in tabs){
        if(tabs[tab][action.groupId]) {
          tabForUser = tab;
          break;
        }
      }
      if(tabs[tabForUser][action.groupId].users.indexOf(action.user.id)<0){
        return Object.assign({}, tabs, {[tabForUser]:
          Object.assign({}, tabs[tabForUser], {[action.groupId]:
            Object.assign({}, tabs[tabForUser][action.groupId], {users:
              [...tabs[tabForUser][action.groupId].users, action.user.id]
            })
          })
        });
      } else {
        return tabs;
      }
    }
    case REMOVE_USER: {
      let tabForRemoveUser;
        for(let tab in tabs){
          if(tabs[tab][action.groupId]) {
            tabForRemoveUser = tab;
            break;
          }
        }
      return Object.assign({}, tabs, {[tabForRemoveUser]:
              Object.assign({}, tabs[tabForRemoveUser], {[action.groupId]:
                Object.assign({}, tabs[tabForRemoveUser][action.groupId], {users:
                  tabs[tabForRemoveUser][action.groupId].users.filter(id => id !== action.userId)
                })
              })
            });
    }
    case GET_USER: {
      if(!action.tabId) return tabs;
			return Object.assign({}, tabs, {[action.tabId]:
        Object.assign({}, tabs[action.tabId], {[action.groupId]:
          Object.assign({}, tabs[action.tabId][action.groupId], {users:
            [...action.userIds]})
        })
      });
    }
    case ADD_MSG: {
      let tabForMessage;
      for(let tab in tabs){
        if(tabs[tab][action.msg.group_id]) {
          tabForMessage = tab;
          break;
        }
      }
      return Object.assign({}, tabs, {[tabs.active]:
        Object.assign({}, tabs[tabs.active], {[action.msg.group_id]:
          Object.assign({}, tabs[tabs.active][action.msg.group_id], {messages:
            [...tabs[tabForMessage][action.msg.group_id].messages, action.msg.id]})
        })
      });
    }
    case GET_MSG: {
			return Object.assign({}, tabs, {[action.tabId]:
        Object.assign({}, tabs[action.tabId], {[action.groupId]:
          Object.assign({}, tabs[action.tabId][action.groupId], {messages:
            [...action.messageIds]})
        })
      });
    }
    case ADD_GROUP:
      return Object.assign({}, tabs, {[action.tabId]: {activeGroup: action.group.id, [action.group.id]: {users: [], messages: []}}
    });
    case REMOVE_TAB:
    console.log("removing tab reducer, action:", action)
      let newTabs = Object.assign({}, tabs);
      delete newTabs[action.tabId];
      return newTabs;
    case REMOVE_GROUP:{
      let removeGroup = Object.assign({}, tabs);
      delete removeGroup[action.tabId][action.groupId];
      removeGroup[action.tabId].activeGroup = 0;
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