import axios from 'axios';
import { fetch_group_msg_ids, delete_group_msg_ids } from './groups'

/* -----------------    ACTIONS     ------------------ */

const FETCH_GROUP_MESSAGES = 'FETCH_GROUP_MESSAGES';
const DELETE_GROUP_MESSAGES = 'DELETE_GROUP_MESSAGES';
const FETCH_MSGS_WITH_USER = 'FETCH_MSGS_WITH_USER';
const REMOVE_GROUP_MESSAGES = 'REMOVE_GROUP_MESSAGES';

/* ------------   ACTION CREATORS     ------------------ */

const fetch_group_messages = groupMsgs => ({ type: FETCH_GROUP_USERS, groupMsgs });
const delete_group_messages = groupId => ({ type: DELETE_GROUP_USERS, groupId }); //too expensive unless mesgs contain groupId
const fetch_msgs_with_user = userMsgs => ({ type: FETCH_MSGS_WITH_USER, userMsgs });

/* ------------       REDUCERS     ------------------ */

export default function reducer (messages = [], action) {
	switch (action.type) {
		case FETCH_GROUP_MESSAGES: return messages.concat(action.groupMsgs);
		case REMOVE_GROUP_MESSAGES: return messages.filter(msg => msg.groupId != action.groupId); //too expensive unless mesgs contain groupId
		case FETCH_MSGS_WITH_USER: return messages.concat(action.userMsgs);
		default: return messages;
	}
}

/* ------------       DISPATCHERS     ------------------ */

export const fetchGroupMessages = group_id => dispatch => {
	axios.get('/messages', {group_id})
		.then(res => res.data)
		.then(msgs => {
			dispatch(fetch_group_messages(msgs));
			dispatch(fetch_group_msg_ids(group_id, msgs.map(msg => msg.id)));
		})
		.catch(err => console.error(`Fetching messages for group ${group_id} unsuccessful`, err));
};

export const deleteGroupMessages = group_id => dispatch => {
	dispatch(delete_group_messages(group_id))
	dispatch(delete_group_msg_ids(group_id))
};

// export const fetchMsgsWithUser = (requestor, user) => dispatch => {  //need both users
// 	axios.get('/messages')
// 		.then(res => dispatch(init(res.data)))
// 		.catch(err => console.error(`Fetching messages with ${user} unsuccessful`, err));
// };
