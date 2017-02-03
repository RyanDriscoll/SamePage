import io from 'socket.io-client';
import rootPath from '../httpServer.jsx';
const newRoot = rootPath.split('/api')[0];

export default io(newRoot);