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
      <div className="TweetList">
        I am the TweetList.  I have { this.props.tweets.length } tweets.
        {
          this.props.tweets.map((tweet, tweet_id) => 
            <Tweet key={tweet_id} {...tweet} />
          )
        }
      </div>
    )
  }
}

export default TweetList;

