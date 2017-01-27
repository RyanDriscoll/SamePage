import axios from 'axios'

/* -----------------    ACTIONS     ------------------ */
const AUTHENTICATED = 'AUTHENTICATED'

/* ------------   ACTION CREATORS     ------------------ */
export const authenticated = user => {

  console.log('in authenticated action creator', user);
  return {
  type: AUTHENTICATED, user
}
}

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
export const login = (username, password) => {
  console.log('login dispatcher called', username, password);
  return dispatch => {
    console.log('inside dispatch before axios request')
    axios.post('/api/auth/login/local',
      {username, password})
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
    axios.post('/api/auth/logout')
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()))

export const whoami = () =>
  dispatch =>
    axios.get('/api/auth/whoami')
      .then(response => {
        const user = response.data
        dispatch(authenticated(user))
      })
      .catch(failed => dispatch(authenticated(null)))

export default reducer