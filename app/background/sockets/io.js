import io from 'socket.io-client';

console.log("front end hello")
export default io('http://localhost:1337');