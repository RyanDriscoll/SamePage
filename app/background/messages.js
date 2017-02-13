import axios from 'axios';
import { fetch_group_msg_ids, delete_group_msg_ids } from './groups'
import rootPath from './httpServer.jsx'

/* -----------------    CONSTANTS    ------------------ */

import LOGOUT from './tabs';
export const ADD_MSG = 'ADD_MSG';
export const GET_MSG = 'GET_MSG';

/* ------------       REDUCERS     ------------------ */
const initialState = {
	0: {}
}
export default function reducer (messages = initialState, action) {
	switch (action.type) {
		case GET_MSG: {
			const groupMessages = action.messages.reduce((obj, message) => {
				obj[message.id] = message;
				return obj;
			}, {});
			return Object.assign({}, messages, groupMessages);
		}
		case ADD_MSG: {
			return Object.assign({}, messages, {[action.msg.id]: action.msg})
		}
		case LOGOUT: return initialState;
		default: return messages;
	}
}

/* ------------       DISPATCHERS     ------------------ */


// export const deleteGroupMessages = group_id => dispatch => {
// 	dispatch(delete_group_messages(group_id))
// 	dispatch(delete_group_msg_ids(group_id))
// };

