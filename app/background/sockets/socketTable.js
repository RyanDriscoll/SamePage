import io from './io';
import store from '../store';
const actions = ['create', 'update', 'delete'];


export default function(table) {
  for (const action of actions) {
    io.on(`${action}:${table}`, record => {
      store.dispatch({
        type: `${action.toUpperCase()}_${table.toUpperCase()}`,
        [table]: record,
      });
    })
  }
}