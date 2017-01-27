// import axios from 'axios'

// /* -----------------    ACTIONS     ------------------ */
// const AUTHENTICATED = 'AUTHENTICATED'

// /* ------------   ACTION CREATORS     ------------------ */
// export const authenticated = user => ({
//   type: AUTHENTICATED, user
// })

// /* ------------       REDUCERS     ------------------ */
// const reducer = (state=null, action) => {
//     console.log('in authenticated reducer')
//   switch(action.type) {
//   case AUTHENTICATED:
//     return action.user;
//   default: return state;
//   }
// }

// /* ------------       DISPATCHERS     ------------------ */
// export const whoami = () => {
//   console.log('in whoami')
//   return dispatch =>
//     axios.get('/api/auth/whoami')
//       .then(response => {
//         const user = response.data
//         dispatch(authenticated(user))
//       })
//       .catch(failed => dispatch(authenticated(null)))
// }

// export const login = (username, password) => {
// console.log('in the login function')
//   return dispatch =>{
//     console.log('in login dispatch')
//     axios.post('/api/auth/login/local',
//       {username, password})
//       .then(() => {
//         console.log('###############')
//         return dispatch(whoami())
//       })
//       .catch(() => {
//         console.log('error!')
//         return dispatch(whoami())
//       })}
// }

// export const logout = () =>
//   dispatch =>
//     axios.post('/api/auth/logout')
//       .then(() => dispatch(whoami()))
//       .catch(() => dispatch(whoami()))


// export default reducer