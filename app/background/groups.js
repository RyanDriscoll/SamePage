import axios from 'axios';
import store from './store.js';

/* -----------------    ACTIONS     ------------------ */

const ADD_GROUP = 'ADD_GROUP';
// const UPDATE_GROUP_NAME = 'UPDATE_GROUP_NAME';
// const CREATE_GROUP_USER = 'CREATE_GROUP_USER'
// const CREATE_GROUP_MESSAGE = 'CREATE_GROUP_MESSAGE'
// const DELETE_GROUP_USER = 'DELETE_GROUP_USER'
// const FETCH_GROUP = 'FETCH_GROUP';
// const FETCH_USER_GROUPS = 'FETCH_USER_GROUPS';
// const FETCH_GROUP_MSG_IDS = 'FETCH_GROUP_MSG_IDS';
// const FETCH_GROUP_USER_IDS = 'FETCH_GROUP_USER_IDS';

/* ------------   ACTION CREATORS     ------------------ */

// const create_group = group => ({ type: ADD_GROUP, 'group': {[group.id]: group}});
// const update_group_name = (groupId, name) => ({ type: UPDATE_GROUP_NAME, groupId, name});
// const create_group_user = (groupId, userId) => ({ type: CREATE_GROUP_USER, groupId, userId});
// const create_group_message = (groupId, msgId) => ({ type: CREATE_GROUP_MESSAGE, groupId, msgId})
// const delete_group_user = (groupId, userId) => ({ type: DELETE_GROUP_USER, groupId, userId})
// const fetch_group = group => ({ type: FETCH_GROUP, 'group': {[group.id]: group}});
// const fetch_user_groups = userGroups => ({ type: FETCH_USER_GROUPS, 'userGroups': Object.assign({},...userGroups.map(group => ({[group.id]: group})))});
// export const fetch_group_msg_ids = (groupId, msgIds) => ({ type: FETCH_GROUP_MSG_IDS, groupId, msgIds });
// export const fetch_group_user_ids = (groupId, userIds) => ({ type: FETCH_GROUP_USER_IDS, groupId, userIds });

/* ------------       REDUCERS     ------------------ */

export default function reducer (groups = {}, action) {

	switch (action.type) {

		case ADD_GROUP: {
			return Object.assign({}, groups, action.group);
		}
		// case FETCH_GROUP: return Object.assign({}, groups, action.group)
		// case FETCH_USER_GROUPS:	return Object.assign({}, groups, action.groups)

		// case UPDATE_GROUP_NAME:	return Object.assign({}, groups, //
		// 		{[action.groupId]: Object.assign({}, groups[action.groupId],
		// 			{name: action.name})})

		// case CREATE_GROUP_USER: return Object.assign({}, groups,   // broadcasted
		// 	{[action.groupId]: Object.assign({}, groups[action.groupId],
		// 		{users: [action.userId,...groups[action.groupId].users]})})

		// case CREATE_GROUP_MESSAGE: return Object.assign({}, groups,   // broadcasted
		// 	{[action.groupId]: Object.assign({}, groups[action.groupId],
		// 		{messages: [action.messageId,...groups[action.groupId].messages]})})

		// case DELETE_GROUP_USER: return Object.assign({}, groups,   // broadcasted
		// 	{[action.groupId]: Object.assign({}, groups[action.groupId],
		// 		{users: groups[action.groupId].users.filter(user => user.id != action.userId)})})

		// case FETCH_GROUP_MSG_IDS:	return Object.assign({}, groups,
		// 	{[action.groupId]: Object.assign({}, groups[action.groupId],
		// 		{messages: [...groups[action.groupId].messages, ...action.groupMsgs]})})

		// case FETCH_GROUP_USER_IDS: return Object.assign({}, groups,
		// 		{[action.groupId]: Object.assign({}, groups[action.groupId],
		// 			{users: [...groups[action.groupId].users, ...action.groupUsers]})})

		default: {
			return groups;
		}
	}
}

/* ------------       DISPATCHERS     ------------------ */

//CREATE_GROUP
// export const createGroup = (url, name, userId) => dispatch => {
// 	if (name == undefined) name = url;
// 	axios.post('/api/groups', {name, url, userId})
// 		.then(res => res.data)
// 		.then(group => dispatch(add_group(group)))
// 		.catch(err => console.error(`Creating group ${name} for ${url} unsuccessful`, err));
// };

export const updateGroupName = (id, name) => dispatch => {
	axios.put(`/api/groups/${id}`, {name})
			 .then(() =>  dispatch(update_group_name(id, name)))
			 .catch(err => console.error(`Updating group ${id}: name ${name} unsuccessful`, err));
};


// export const createGroupMsg = (groupId, msgId) => dispatch => {
// 	axios.put(`api/messages/${groupID}`, )

// export const createGroupUser = (group, userId) => dispatch => {
// 	axios.put(`api/groups/${groupID}`)



export const fetchUserGroups = userId => dispatch => {
	axios.get(`/api/groups/user/${userId}`)
		.then(res => res.data)
		.then(userGroups => dispatch(fetch_user_groups(userGroups)))
		.catch(err => console.error(`Fetching groups from user ${userId} unsuccessful`, err));
}

export const fetchGroup = id => dispatch => {
	axios.get(`/api/groups/${id}`)
		.then(res => res.data)
		.then(group => dispatch(fetch_group(group)))
		.catch(err => console.error(`Fetching group ${id} unsuccessful`, err));
};

export const removeGroupUser = (groupId, userId) => {
	axios.delete('/api/groups/users', {groupId, userId})
}

// export const fetchUserGroups = userId => dispatch => {
// 	axios.get(`/api/groups/user/${userId}`)
// 	.then(res => res.data)
// 	.then(userGroups => dispatch(fetch_user_groups(userGroups)))
// 	.catch(err => console.error(`Fetching groups for user ${userId} unsuccessful`, err));
// };


// let urlsOfTabs = {};



// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {

  // if (changeInfo.url && urlsOfTabs[tabId]) {
	// 	urlsOfTabs[tabId] = changeInfo.url;
  // }
	// console.log("onUpdate args: ", arguments)
// });


// chrome.tabs.onRemoved.addListener(function(tabId){
	// if (urlsOfTabs[tabId]) {

	// 	// removeGroupUser(groupId, store.auth.user.id)
	// 	delete urlsOfTabs[tabId];
  // }
	// console.log("onRemove", urlsOfTabs)

// })