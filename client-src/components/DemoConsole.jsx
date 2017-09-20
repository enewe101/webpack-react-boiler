import React from 'react';
import ReactDOM from 'react-dom';
import { Form, SchemaForm } from './Form'
import fetchit from '../services/fetchit'
import TweetList from './TweetList.jsx'
import api from '../services/api.js';
import subscribeToTweetStream from '../services/TweetStream.js';


class DemoConsole extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
      filter: null,
    }
    this.numToKeep = 40;
    subscribeToTweetStream(this.displayTweet);
  }

  displayTweet = (err, tweet) => {
    console.log('bo');
    console.log(tweet);
    this.setState((prevState , props) => {
      return {'tweets': [tweet, ...prevState.tweets].slice(0,this.numToKeep)};
    });
  }

  handleUserStatusChange = response => {
    console.log('receiving user status change:');
    console.log(response);
    this.setState({fbUser:response});
  }

  render() {
    return (
      <div className="DemoConsole" >
        I am the DemoConsole
        <TweetList tweets={this.state.tweets} />
      </div>
    )
  }
}

export default DemoConsole;

