import axios from 'axios'
import rootPath from './httpServer.jsx';
import {getCircle} from './actionAndDispatch'


/* -----------------    CONSTANTS     ------------------ */
const AUTHENTICATED = 'AUTHENTICATED'

/* ------------   ACTION CREATORS     ------------------ */
export const authenticated = user => {

  return {
    type: AUTHENTICATED, user
  };
};

/* ------------       REDUCERS     ------------------ */
const reducer = (state=null, action) => {
  switch (action.type) {
  case AUTHENTICATED:
    return action.user;
  default: return state;
  }
}

/* ------------       DISPATCHERS     ------------------ */
export const whoami = () => {
  return dispatch => {
    return axios.get(rootPath + 'auth/whoami')
      .then(response => {
        const user = response.data;
        dispatch(authenticated(user))
        getCircle(user.id)
      })
      .catch(failed =>{
        console.log("------------>>>>>>>>>>>>>>failure", failed, failed.stack)
        dispatch(authenticated(null))
      })
  }
}

export const login = ({ email, password }) => {
  return dispatch => {
    axios.post(rootPath + 'auth/login',
      {email, password})
      .then(() => {
        return dispatch(whoami())
      })
      .catch(() => {
        return dispatch(whoami())
      })
    }
}
export const logout = () => {
  return dispatch => {
    return axios.post(rootPath + 'auth/logout')
      .then(() => {
        const noUser = null;
        return dispatch(authenticated(noUser))})
      .catch(() => {
        dispatch(whoami())
      })
  }
}


export const signup = ({ email, username, password }) => {
  return dispatch => {
    axios.post(rootPath + 'users',
      {email, username, password})
      .then((res) => {
        return dispatch(login({email, password}));
      })
      .catch((err) => {
        console.error(err.stack);
      });
    };
}

export default reducer