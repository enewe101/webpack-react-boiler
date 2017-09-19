import React from 'react';
import ReactDOM from 'react-dom';
import { Form, SchemaForm } from './Form'
import fetchit from '../services/fetchit'
import Tweet from './Tweet.jsx'

class TweetList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
      filter: null,
    }
  }

  handleGotTweet = tweet => {
    this.setState({tweets: [tweet]});
  }

  render() {
    return (
      <div>
        I am the TweetList.
        <Tweet/>
      </div>
    )
  }
}

export default TweetList;

