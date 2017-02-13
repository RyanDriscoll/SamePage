
/* -----------------    CONSTANTS     ------------------ */

import LOGOUT from './tabs';
export const GET_USER = 'GET_USER';
export const ADD_USER = 'ADD_USER';
export const REMOVE_USER = 'REMOVE_USER';

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
			return users;
		}
		case LOGOUT: return initialState;
		default: return users;
	}
}

/* ------------       DISPATCHERS     ------------------ */