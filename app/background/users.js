import axios from 'axios';
import { fetch_group_user_ids, delete_group_user_ids } from './groups'
import rootPath from './httpServer.jsx'

/* -----------------    ACTIONS     ------------------ */

const FETCH_GROUP_USERS = 'FETCH_GROUP_USERS';
const DELETE_GROUP_USERS = 'DELETE_GROUP_USERS';

/* ------------   ACTION CREATORS     ------------------ */

const fetch_group_users = groupUsers => ({ type: FETCH_GROUP_USERS, groupUsers });
const delete_group_users = groupId => ({ type: DELETE_GROUP_USERS, groupId });
// const add_group_user = (groupId, )

/* ------------       REDUCERS     ------------------ */

export default function reducer (users = [], action) {
	switch (action.type) {
		case FETCH_GROUP_USERS:	return users.concat(action.groupUsers);
		case DELETE_GROUP_USERS: return users.filter(user => user.groupId != action.groupId);
		default: return users;
	}
}

/* ------------       DISPATCHERS     ------------------ */

export const fetchGroupUsers = group_id => dispatch => {
	axios.get(rootPath + 'groups/group_users', {params:{group_id}})
		.then(res => res.data)
		.then(users => {
			console.log("yooo", users)
			dispatch(fetch_group_users(users));
			// dispatch(fetch_group_user_ids(group_id, user.map(user => user.id)));
		})
		.catch(err => console.error(`Fetching users for group ${group_id} unsuccessful`, err));
};

export const deleteGroupUsers = group_id => dispatch => { 
	dispatch(delete_group_users(group_id))
	dispatch(delete_group_user_ids(group_id))
};