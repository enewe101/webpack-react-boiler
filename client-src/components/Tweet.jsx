import React from 'react';
import ReactDOM from 'react-dom';
import { Form, SchemaForm } from './Form'
import fetchit from '../services/fetchit'

class Tweet extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        I am a tweet
      </div>
    )
  }
}

export default Tweet;


