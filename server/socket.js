const live = false;

function startSocket(server) {
  const io = require('socket.io')(server);
  io.on('connection', (client) => {
    client.on('subscribeToTimer', (interval) => {

      if(live) {
        streamTweets()

      } else {
        simulateStreamTweets(client)
      }

    });
  });
}


function simulateStreamTweets(client) {
  function sendNextTweet() {
    client.emit('timer', {'yo':'thing'});
    setTimeout(sendNextTweet, Math.random()*8000);
  }
  sendNextTweet();
}


// Live tweet streaming not implemented yet.
const streamTweets = simulateStreamTweets;

module.exports = startSocket
