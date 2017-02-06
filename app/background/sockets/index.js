import socketTable, {socketListeners} from './socketTable';


export default {
  message: socketTable('msg'),
  group_user: socketTable('user'),
  sockets: socketListeners(),
}
