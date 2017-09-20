import openSocket from 'socket.io-client'
const socket = openSocket('https://aventamedia.com');

function subscribeToTweetStream(cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('subscribeToTimer', 1000);
}

export default subscribeToTweetStream;
