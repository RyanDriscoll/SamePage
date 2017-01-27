
import {authenticated} from './auth.jsx';



const authenticatedAlias = (authenticated) => {
  // return a thunk/promise/etc
};

export default {
  'AUTHENTICATED': authenticatedAlias // the action to proxy and the new action to call
};