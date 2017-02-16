
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
    case GET_USER:
      return Object.assign({}, users, action.users.reduce((obj, GrpUser) => {
        obj[GrpUser.user_id] = GrpUser.user
        return obj
      }, {}))
    case ADD_USER: {
      return Object.assign({}, users, {[action.userId]: action.user});
    }
    case REMOVE_USER: {
      return users;
    }
    case LOGOUT: return initialState;
    default: return users;
  }
}

/* ------------       DISPATCHERS     ------------------ */