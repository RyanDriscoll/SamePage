import axios from 'axios'
import rootPath from './httpServer.jsx'
import store from './store'

/* -------------------- CONSTANTS --------------------*/

export const GET_CIRCLE = 'GET_CIRCLE'
import LOGOUT from './tabs';


/* ----------------------REDUCER -------------------*/

const initialState = {
  0: {}
}

export default function reducer(circles = initialState, action) {

  switch(action.type) {

    case GET_CIRCLE: {
      const fetchedCircles = action.circles.reduce((obj, circle) => {
        obj[circle.id] = circle
        return obj
      }, {})
      return Object.assign({}, circles, fetchedCircles)
    }
    case LOGOUT: return initialState;
    default: return circles;
  }
}

/* ------------------- DISPATCHERS -----------------------------------*/

