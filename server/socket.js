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


const { exec } = require('child_process');



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

      let serialized = JSON.stringify(tweets);
      serialized = JSON.stringify(tweets);
      serialized = serialized.replace(/'/g, '');
      executable = '/app/env/bin/python3 classify.py';
      let command = executable + " '" + serialized +  "'";
        
      exec(command, (err, stdout, stderr) => {
        if (err) {
          console.log(err);
        }

        let classified = shuffleArray(JSON.parse(stdout));
        function sendNextTweet() {
          client.emit('timer', classified.pop());
          setTimeout(sendNextTweet, Math.random()*2000);
        }
        sendNextTweet();

      });

  }
}

function shuffleArray(array) {
	for (var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array;
}

// Live tweet streaming not implemented yet.
const streamTweets = simulateStreamTweets;

module.exports = startSocket
