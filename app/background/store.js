import { combineReducers } from 'redux';
import groups from './groups'
import users from './users'
import messages from './messages'

export default combineReducers({ groups, users, messages });
