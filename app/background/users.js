import axios from 'axios';
import { fetch_group_user_ids, remove_group_user_ids } from './groups'

/* -----------------    ACTIONS     ------------------ */

const FETCH_GROUP_USERS = 'FETCH_GROUP_USERS';
const REMOVE_GROUP_USERS = 'REMOVE_GROUP_USERS';

/* ------------   ACTION CREATORS     ------------------ */

const fetch_group_users = groupUsers => ({ type: FETCH_GROUP_USERS, groupUsers });
const remove_group_users = groupId => ({ type: REMOVE_GROUP_USERS, groupId });
// const add_group_user = (groupId, )

/* ------------       REDUCERS     ------------------ */

export default function reducer (users = [], action) {
	switch (action.type) {
		case FETCH_GROUP_USERS:	return users.concat(action.groupUsers);
		case REMOVE_GROUP_USERS: return users.filter(user => user.groupId != action.groupId);
		default: return users;
	}
}

/* ------------       DISPATCHERS     ------------------ */

export const fetchGroupUsers = group_id => dispatch => {
	axios.get('/users', {group_id})
		.then(res => res.data)
		.then(user => {
			dispatch(fetch_group_users(users));
			dispatch(fetch_group_user_ids(group_id, user.map(user => user.id)));
		})
		.catch(err => console.error(`Fetching users for group ${group_id} unsuccessful`, err));
};

export const removeGroupUsers = group_id => dispatch => { 
	dispatch(remove_group_users(group_id))
	dispatch(remove_group_user_ids(group_id))
};