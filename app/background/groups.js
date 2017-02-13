import axios from 'axios';
import store from './store.js';

/* -----------------    CONSTANTS    ------------------ */

export const ADD_GROUP = 'ADD_GROUP';
import LOGOUT from './tabs';

/* ------------       REDUCER     ------------------ */
const initialState = {
	0: {}
}
export default function reducer (groups = initialState, action) {

	switch (action.type) {

		case ADD_GROUP: {
			return Object.assign({}, groups, ...action.group.map(group=>({[group.id]: group})));
		}

		case LOGOUT: return initialState;
		default: return groups;
	}
}

/* ------------       DISPATCHERS     ------------------ */


// export const updateGroupName = (id, name) => dispatch => {
// 	axios.put(`/api/groups/${id}`, {name})
// 			 .then(() =>  dispatch(update_group_name(id, name)))
// 			 .catch(err => console.error(`Updating group ${id}: name ${name} unsuccessful`, err));
// };

