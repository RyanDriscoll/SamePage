import axios from 'axios';
import store from './store.js';

/* -----------------    ACTIONS     ------------------ */
const ADD_GROUP = 'ADD_GROUP';


/* ------------       REDUCER     ------------------ */
const initialState = {
	0: {}
}
export default function reducer (groups = initialState, action) {

	switch (action.type) {

		case ADD_GROUP: {
			return Object.assign({}, groups, {[action.group.id]: action.group});
		}

		default: {
			return groups;
		}
	}
}

/* ------------       DISPATCHERS     ------------------ */

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