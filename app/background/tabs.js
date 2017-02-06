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
// const ADD_TAB = 'ADD_TAB';
export const CHANGE_ACTIVE = 'CHANGE_ACTIVE';
//const REMOVE_MSG = 'REMOVE_MSG';
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
    // case ADD_GROUP:
    //   return Object.assign({}, tabs, action.payload)
    // case REMOVE_GROUP:
    // //change this later to have gross nested object.assigns
    //   let newTabsObj = Object.assign({}, tabs);
    //   delete newTabsObj[action.tabId][action.groupId];
    //   return newTabsObj;
    case ADD_USER: {
      return Object.assign({}, tabs, {[action.tabId]:
        Object.assign({}, tabs[action.tabId], {[action.groupId]:
          Object.assign({}, tabs[action.tabId][action.groupId], {users:
            [...tabs[tabs.active][action.groupId].users, action.user.id]
          })
        })
      });
    }
    case REMOVE_USER: {
      console.log('remove_user---action---tabs', action, tabs)
    //change this later to have gross nested object.assigns
    return Object.assign({}, tabs, {[action.tabId]:
            Object.assign({}, tabs[action.tabId], {[action.groupId]:
              Object.assign({}, tabs[action.tabId][action.groupId], {users:
                tabs[tabs.active][action.groupId].users.filter(id => id !== action.userId)
              })
            })
          });
      // let newObj = Object.assign({}, tabs);
      // delete newObj[action.tabId][action.groupId].users[action.user.id];
      // return newObj;
    }
    case GET_USER: {
      // const userIds = action.userIds.reduce((obj, userId) => {
			// 	obj[userId] = 1;
			// 	return obj;
			// }, {});
      // console.log('action', action)
      if(!action.tabId) return tabs;
			return Object.assign({}, tabs, {[action.tabId]:
        Object.assign({}, tabs[action.tabId], {[action.groupId]:
          Object.assign({}, tabs[action.tabId][action.groupId], {users:
            [...action.userIds]})
        })
      });
    }
    case ADD_MSG: {
      // console.log('inside tabs action reducer', action)
      return Object.assign({}, tabs, {[tabs.active]:
        Object.assign({}, tabs[tabs.active], {[action.msg.group_id]:
          Object.assign({}, tabs[tabs.active][action.msg.group_id], {messages:
            [...tabs[tabs.active][action.msg.group_id].messages, action.msg.id]})
        })
      });
    }
    case GET_MSG: {
      // const messageIds = action.messageIds.reduce((obj, messageId) => {
			// 	obj[messageId] = 1;
			// 	return obj;
			// }, {});
			return Object.assign({}, tabs, {[action.tabId]:
        Object.assign({}, tabs[action.tabId], {[action.groupId]:
          Object.assign({}, tabs[action.tabId][action.groupId], {messages:
            [...action.messageIds]})
        })
      });
    }
    case ADD_GROUP:
      console.log('add group action', action)
      return Object.assign({}, tabs, {[action.tabId]: {activeGroup: action.group.id, [action.group.id]: {users: [], messages: []}}
    });
    case REMOVE_TAB:
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

//add_user, get_user, remove_user

// export const add_group = (tabId, group) => {
//   return {
//     type: ADD_GROUP,
//     payload:{
//       [tabId]: {
//         [group.id]: {
//           users: group.users,
//           messages: group.messages
//         }
//       }
//     }
//   }
// };

// export const remove_group = (tabId, groupId) => {
//   return {
//     type: REMOVE_GROUP,
//     tabId: tabId,
//     groupId: groupId
//   }
// };

// export const add_user = (tabId, groupId, userId) => {
//   return {
//     type: ADD_USER,
//     userId: userId,
//     groupId: groupId,
//     tabId: tabId
//   }
// }

// // export const add_msg = (message) => {
// //   return {
// //     type: ADD_MSG,
// //     message: message.msg,
// //     tabId: message.tabId
// //   }
// // }

// export const remove_user = (tabId, groupId, userId) => {
//   return {
//     type: REMOVE_USER,
//     userId: userId,
//     groupId: groupId,
//     tabId: tabId
//   }
// }

// export const change_active = (tabId) => {
//   return {
//     type: CHANGE_ACTIVE,
//     tabId: tabId
//   }
// }


//----------------    dispatchers   -------------------

// export const addGroup = (groupUrl, tabId, user_id) => {
//   // return (dispatch) => {
//     axios.post(rootPath + 'groups', {url: groupUrl, name: groupUrl, user_id: user_id})
//     .then(response => response.data)
//     .then(group => {
//       store.dispatch(add_group(tabId, group));
//     })
//     .catch(err => console.error(err.stack))
//   // }
// }

// export const removeGroup = (tabId, groupId) => {
//   // return (dispatch) => {
//     axios.delete(rootPath + `groups/${groupId}`)
//     .then(() => store.dispatch(remove_group(tabId, groupId)))
//     .catch(err => console.error(err.stack))
//   // }
// }

// export const createGroup = (url, name, userId) => dispatch => {
// 	if (name == undefined) name = url;
// 	axios.post('/api/groups', {name, url, userId})
// 		.then(res => res.data)
// 		.then(group => dispatch(add_group(group)))
// 		.catch(err => console.error(`Creating group ${name} for ${url} unsuccessful`, err));
// };