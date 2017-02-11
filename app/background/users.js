
/* -----------------    CONSTANTS     ------------------ */

const GET_USER = 'GET_USER';
const ADD_USER = 'ADD_USER';
const REMOVE_USER = 'REMOVE_USER';

/* ------------   ACTION CREATORS     ------------------ */

// const get_user = groupUsers => ({ type: FETCH_GROUP_USERS, groupUsers });
// const add_user = groupId => ({ type: DELETE_GROUP_USERS, groupId });
// const add_user = groupId => ({ type: DELETE_GROUP_USERS, groupId });
// const add_group_user = (groupId, )

/* ------------       REDUCERS     ------------------ */
const initialState = {
	0: {
		0: ({})
	}
}
export default function reducer (users = initialState, action) {
	switch (action.type) {
		case GET_USER: {
			const groupUsers = action.users.reduce((obj, user) => {
				if(action.tabId){
					if(!users[user.user_id]) obj[user.user_id] = {id: user.user_id, username: user.user.username};
				}else{
					if(!users[user.id]) obj[user.id] = {id: user.id, username: user.username};					
				}
				return obj;
			}, {});
			return Object.assign({}, users, groupUsers);
		}
		case ADD_USER: {
			return Object.assign({}, users, {[action.user.id]: action.user});
		}
		case REMOVE_USER: {
			// const groupUsers = action.users.reduce((obj, user) => {
			// 	if (user.id !== action.user.id) {
			// 		obj[user.id] = user;
			// 	}
			// 	return obj;
			// }, {});
			// return Object.assign({}, users, groupUsers);
			return users;
		}
		default:
			return users;
	}
}

/* ------------       DISPATCHERS     ------------------ */

// export const fetchGroupUsers = group_id => dispatch => {
// 	axios.get(rootPath + 'groups/group_users', {params:{group_id}})
// 		.then(res => res.data)
// 		.then(users => {
// 			console.log("yooo", users)
// 			dispatch(fetch_group_users(users));
// 			// dispatch(fetch_group_user_ids(group_id, user.map(user => user.id)));
// 		})
// 		.catch(err => console.error(`Fetching users for group ${group_id} unsuccessful`, err));
// };

// export const deleteGroupUsers = group_id => dispatch => {
// 	dispatch(delete_group_users(group_id))
// 	dispatch(delete_group_user_ids(group_id))
// };