import React from 'react';
import ReactDOM from 'react-dom';
import { Form, SchemaForm } from './Form'
import fetchit from '../services/fetchit'
import TweetList from './TweetList.jsx'

import openSocket from 'socket.io-client'
const socket = openSocket('https://aventamedia.com');
function subscribeToTimer(cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('subscribeToTimer', 1000);
}


class DemoConsole extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
      filter: null,
    }
  }

  handleUserStatusChange = response => {
    console.log('receiving user status change:');
    console.log(response);
    this.setState({fbUser:response});
  }

  render() {
    subscribeToTimer(function(err, timestamp){
      console.log(timestamp);
    });
    return (
      <div>
        I am the DemoConsole
        <TweetList/>
      </div>
    )
  }
}

export default DemoConsole;

