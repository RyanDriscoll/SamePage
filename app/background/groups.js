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
			return Object.assign({}, groups, ...action.group.map(group=>({[group.id]: group})));
		}

		case 'LOGOUT': return initialState;
		default: return groups;
	}
}

/* ------------       DISPATCHERS     ------------------ */


export const updateGroupName = (id, name) => dispatch => {
	axios.put(`/api/groups/${id}`, {name})
			 .then(() =>  dispatch(update_group_name(id, name)))
			 .catch(err => console.error(`Updating group ${id}: name ${name} unsuccessful`, err));
};



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

