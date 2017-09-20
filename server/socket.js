const live = false;
const Tweet = require('./models/Tweet.js')


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

  Tweet.find({}, function(err, tweets){
    if(err) {
      console.log(err);
      client.emit('timer', err);
    } else {
      startTweetFeed(tweets);
    }
  });

  function startTweetFeed(tweets) {
    function sendNextTweet() {
      tweet = tweets.pop();
      client.emit('timer', tweet);
      setTimeout(sendNextTweet, Math.random()*8000);
    }
    sendNextTweet();
  }
}


// Live tweet streaming not implemented yet.
const streamTweets = simulateStreamTweets;

module.exports = startSocket
