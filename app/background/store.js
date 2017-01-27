import { combineReducers } from 'redux';
import groups from './groups';
import users from './users';
import messages from './messages';
import auth from './auth.jsx';
import socketFuncs from './sockets';

console.log("socket funcs", socketFuncs.message)

export default combineReducers({ groups, users, messages, auth });
