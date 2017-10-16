import React from 'react';
import ReactDOM from 'react-dom';
import { Form, SchemaForm } from './Form'
import fetchit from '../services/fetchit'
import Tweet from './Tweet.jsx'
import { CSSTransitionGroup } from 'react-transition-group'

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
    var tweet_array = this.props.tweets.map((tweet, tweet_id) =>
          <Tweet key={tweet_id} {...tweet} />
    )
    console.log(tweet_array)
    var transitionGroup = ''
    if(tweet_array.length > 0) {
       transitionGroup = tweet_array
    }
    return (
      <div className="TweetList">
        <CSSTransitionGroup transitionName="example" transitionEnterTimeout={700}
        transitionLeaveTimeout={700}>
        {tweet_array}
        </CSSTransitionGroup>
       </div>
    )
  }
}

export default TweetList;

