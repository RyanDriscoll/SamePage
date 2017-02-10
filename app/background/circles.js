import axios from 'axios'
import rootPath from './httpServer.jsx'


/* -------------------- ACTIONS --------------------*/

const GET_CIRCLE = 'GET_CIRCLE'



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
			})
			return Object.assign({}, circles, fetchedCircles)
		}
		default:
			return circles;
	}
}

/* ------------------- DISPATCHERS -----------------------------------*/

export const getCircle = user_id => {
	axios.get(rootPath + 'circles', user_id)
	.then (res => res.data)
	.then(circles => {
		dispatch({type: GET_CIRCLE, circles: circles})
	})
	.catch(err => console.error(`Error fetching circles for user ${user_id} unsuccessful`, err))
}