import axios from 'axios'
import rootPath from './httpServer.jsx'
import store from './store'

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
			}, {})
			return Object.assign({}, circles, fetchedCircles)
		}
		default:
			return circles;
	}
}

/* ------------------- DISPATCHERS -----------------------------------*/

export const getCircle = user_id => {
	axios.get(rootPath + 'circles', {params: {user_id: user_id}})
	.then (res => res.data)
	.then(circles => {
		let mappedCircles = circles.map( (circle) => circle.circle )
		store.dispatch({type: GET_CIRCLE, circles: mappedCircles})
	})
	.catch(err => console.error(`Error fetching circles for user ${user_id} unsuccessful`, err))
}