import { combineReducers, createStore, applyMiddleware } from 'redux';
import groups from './groups';
import users from './users';
import messages from './messages';
import auth from './auth.jsx';
import tabs from './tabs.js';
import socketFuncs from './sockets/index.js';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { alias } from 'react-chrome-redux';
import aliases from './aliases';


const rootReducer = combineReducers({ groups, users, tabs, messages, auth });

export default createStore(rootReducer, applyMiddleware(alias(aliases), thunkMiddleware, createLogger({collapsed: true})));
