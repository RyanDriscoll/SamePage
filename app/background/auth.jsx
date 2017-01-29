import axios from 'axios'
import rootPath from './httpServer.jsx';

/* -----------------    ACTIONS     ------------------ */
const AUTHENTICATED = 'AUTHENTICATED'

/* ------------   ACTION CREATORS     ------------------ */
export const authenticated = user => {

  console.log('in authenticated action creator', user);
  return {
    type: AUTHENTICATED, user
  };
};

/* ------------       REDUCERS     ------------------ */
const reducer = (state=null, action) => {
  console.log('in the reducer', state, action);
  switch (action.type) {
  case AUTHENTICATED:
    return action.user;
  default: return state;
  }
}

/* ------------       DISPATCHERS     ------------------ */
export const login = ({ email, password }) => {
  console.log('login dispatcher called', email, password);
  return dispatch => {
    console.log('inside dispatch before axios request')
    axios.post(rootPath + 'auth/login',
      {email, password})
      .then(() => {
        console.log('###############')
        return dispatch(whoami())
      })
      .catch(() => {
        console.log('error!')
        return dispatch(whoami())
      })
    }
}
export const logout = () =>
  dispatch =>
    axios.post(rootPath + 'auth/logout')
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()))

export const whoami = () => {
  console.log('whoami before dispatch')
  return dispatch => {
    console.log('in whoami after dispatch')
    return axios.get(rootPath + 'auth/whoami')
      .then(response => {
        console.log('user data from whoami', response.data)
        const user = response.data
        dispatch(authenticated(user))
      })
      .catch(failed => dispatch(authenticated(null)))
  }
}

export const signup = ({ email, username, password }) => {
  console.log('in signup')
  return dispatch => {
    axios.post(rootPath + 'users',
      {email, username, password})
      .then((res) => {
        console.log('successfully created user', res.data)
        return dispatch(login(email, password));
      })
      .catch((err) => {
        console.error(err.stack);
      });
    };
}

export default reducer